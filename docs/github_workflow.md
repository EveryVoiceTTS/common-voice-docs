# Github Workflow

# Personal Access Token (PAT)
Create a PATH more specifically a `Fine-grained token`.
* `Repository Access`: `SamuelLarkin/common-voice`
* `Repository permissions`: 
    * `Read access` to:
        * `metadata`
    * `Read and Write access` to:
        * `actions`
        * `code`

## Note
We used [Permissions required for fine-grained personal access tokens](https://docs.github.com/en/rest/overview/permissions-required-for-fine-grained-personal-access-tokens?apiVersion=2022-11-28) to figure out wich `permissions` by looking for the api calls that had `dispatches`.
* [Actions](https://docs.github.com/en/rest/overview/permissions-required-for-fine-grained-personal-access-tokens?apiVersion=2022-11-28#actions) `POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches` (write)
* [Contents](https://docs.github.com/en/rest/overview/permissions-required-for-fine-grained-personal-access-tokens?apiVersion=2022-11-28#contents) `POST /repos/{owner}/{repo}/dispatches` (write)
