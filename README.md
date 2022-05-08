# BulletBoard-KV

BulletBoard based on Cloudflare KV

## Usage

- Change the KV namespace in `src/worker.js`

```js
// KV Support
KV = kv-namespace;
```

- Upload the code in `worker.js` to cloudflare workers
- Bind a KV namespace to your worker
- Enjoy it

## APIs
| Endpoint     | Params | Comments                       |
| :----------- | :----- | :----------------------------- |
| `/put/<key>` | data   | Post Your data in request body |
| `/get/<key>` | -      | Get data with a key            |
| `/del/<key>` | -      | Delete a key                   |
| `/allkeys`   | -      | Get all keys                   |
| `/delkeys`   | -      | Delete all keys                |
