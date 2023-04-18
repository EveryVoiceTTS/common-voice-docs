# Databases

## Sentence Correction
During our initial recordings, the speaker noted some minor typos/errors on some sentences.
We wondered what would happen if we updated the sentence text file with the corrected sentences.

Initially, we couldn't get our local instance to update its database whereas the instance running on AWS would.
We had to disable `#CV_ENVIRONMENT="local"` in `.env-local-docker` to get the new sentences to be injected in the database.

### Initial State
As a test, using our local instance running under `docker`, we added 3 sentences to `git`.

```
This is a test.
There is a ttypo in this sentence.
I eat an apple.
```

Verifying that the sentences were indeed, added to the `sentences` table.
```sql
use voiceweb;

select text, version from sentences where source = 'update_sentence_samuel';
+------------------------------------+---------+
| text                               | version |
+------------------------------------+---------+
| There is a ttypo in this sentence. |       1 |
| I eat an apple.                    |       1 |
| This is a test.                    |       1 |
+------------------------------------+---------+
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

select text, version from sentences where source = 'update_sentence_samuel';
+------------------------------------------------------+---------+
| text                                                 | version |
+------------------------------------------------------+---------+
| There is a typo in this sentence and it's now fixed. |       2 |
| There is a ttypo in this sentence.                   |       1 |
| I eat an apple.                                      |       2 |
| Why not add another sentence.                        |       2 |
| This is a test.                                      |       2 |
+------------------------------------------------------+---------+
5 rows in set (0.00 sec)
```

### Code
When look at the code that import sentences into the database, it's clear that if we modify a sentence, its `id` will change thus it won't override the old sentence.
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

### Conclusion
