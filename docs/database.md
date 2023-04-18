# Databases

## Sentence Correction
During our initial recordings, the speaker noted some minor typos/errors on some sentences.
We wondered what would happen if we updated the sentence text file with the corrected sentences.

Initially, we couldn't get our local instance to update its database whereas the instance running on AWS would.
We had to disable `#CV_ENVIRONMENT="local"` in `.env-local-docker` to get the new sentences to be injected in the database.

### Initial State
As a test, using our local instance running under `docker`, we added 3 sentences to `git`.

```
This is a test that will be deleted.
There is a ttypo in this sentence.
I eat an apple.
```

Verifying that the sentences were indeed, added to the `sentences` table.
```sql
use voiceweb;

SELECT text, version, created_at FROM sentences WHERE source = 'update_sentence_samuel';
+--------------------------------------+---------+---------------------+
| text                                 | version | created_at          |
+--------------------------------------+---------+---------------------+
| This is a test that will be deleted. |       1 | 2023-04-18 18:49:57 |
| There is a ttypo in this sentence.   |       1 | 2023-04-18 18:49:57 |
| I eat an apple.                      |       1 | 2023-04-18 18:49:57 |
+--------------------------------------+---------+---------------------+
3 rows in set (0.00 sec)
```

### Updated State
Let's fixed the second sentence and add a fourth one to see what happens.

```
This is a test.
There is a typo in this sentence and it's now fixed.
I eat an apple.
Why not add another sentence.
```

What is the current state of `sentences` with respect to our test `source`?
```sql
use voiceweb;

SELECT text, version, created_at FROM sentences WHERE source = 'update_sentence_samuel';
+------------------------------------------------------+---------+---------------------+
| text                                                 | version | created_at          |
+------------------------------------------------------+---------+---------------------+
| There is a typo in this sentence and it's now fixed. |       2 | 2023-04-18 18:52:58 |
| I eat an apple.                                      |       2 | 2023-04-18 18:49:57 |
| Why not add another sentence.                        |       2 | 2023-04-18 18:52:58 |
+------------------------------------------------------+---------+---------------------+
3 rows in set (0.00 sec)
```

### Code
When looking at the code that imports sentences into the database, it's clear that if we modify a sentence, its `id` will change thus it won't override the old sentence.
A sentence's `id` is based on its content and optionally its locale.

`server/src/lib/model/db/import-sentences.ts`
`importLocaleSentences()`
```typescript
await pool.query(
  `
  INSERT INTO sentences
  (id, text, is_used, locale_id, source, version)
  VALUES ${sentences
    .map(sentence => {
      return `(${[
        LOCALE_HASH_SOURCES.includes(source)
          ? hashSentence(localeId + sentence)
          : hashSentence(sentence),
        sentence,
        true,
        localeId,
        source,
        version,
      ]
        .map(v => pool.escape(v))
        .join(', ')})`;
    })
    .join(', ')}
  ON DUPLICATE KEY UPDATE
    source = VALUES(source),
    version = VALUES(version),
    is_used = VALUES(is_used);
`
);
```

Once all locales have been processed, the old and unused `version`s are purged.
```typescript
await pool.query(
  `
    DELETE FROM sentences
    WHERE id NOT IN (SELECT original_sentence_id FROM clips) AND
          id NOT IN (SELECT sentence_id FROM skipped_sentences) AND
          id NOT IN (SELECT sentence_id FROM reported_sentences) AND
          id NOT IN (SELECT sentence_id FROM taxonomy_entries) AND
          version <> ?
  `,
  [version]
);
```
Note that it looks like `version` is in lock step with the number of times we call `importLocaleSentences()`.

### Conclusion
Given sufficient time to cleanse the database, the new sentences are going to replace the old ones.
The `version` in `sentences` looks to be the `source` version aka the version of the whole text file.
