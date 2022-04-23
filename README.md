## 概要
個人的な Next.js アプリケーションのテンプレートです．

## 開発サーバー起動
```
$ docker-compose -f docker/dev/docker-compose.yml up --build

または

$ make up-dev-d
```

開発用のため，コンテナでは `next dev` を実行していて，`node_modules`，`.next` をマウントしているので HMR が動作します．

## プロダクションビルド
```
$ docker-compose -f docker/production/docker-compose.yml build

または

$ make build-production-no-cache
```

## 参考
### マルチステージビルドの構成  

【Node.js/Next.js】Cloud Runで動作する軽量なDockerを構築してみた  
https://zenn.dev/kazumax4395/articles/427cc791f6145b



### 複数環境の docker ファイルの構成，Makefile のスクリプト等  

vercel/next.js > /examples/with-docker-multi-env  
https://github.com/vercel/next.js/tree/canary/examples/with-docker-multi-env
