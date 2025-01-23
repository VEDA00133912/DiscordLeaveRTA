# DiscordLeaveRTA
即抜けRTAの時間計測BOT
# 実行
・envファイルを作成
```
touch .env
```
・envファイルに書き込む
```
DISCORD_TOKEN= DiscordBOTのToken
MONGODB_URI= 自分のmongoDBのURI
```
・config.jsonにEmbedを送信するチャンネルを設定
```json
{
    "rtaChannelId": "チャンネルID"
}
```
・必要なパッケージのインストール、実行
```
npm i
npm start
```
# 動作
![image](https://github.com/user-attachments/assets/1349e1ae-1045-460c-853a-c31da2c10c87)
