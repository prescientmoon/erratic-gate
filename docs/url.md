# The url parser

If the first word is 'gist', the parser will automatcally try to fetch the github gist with the id equl to the second word:

**_Eg_**:

```
gist 8886faa6f99a7d2667ea8aa2f81ace04
```

![example of a gist id](./assets/gist_url.png)

Else, the parser will just try to fetch directly from the full string
