# ใช้ dev ไปก่อนเพราะ production ยังไม่เสร็จ

## for dev

```
$ docker-compose -f docker-compose.dev.yaml up -d
```

## for production

```
$ docker compose -f compose.prod.yaml up --build -d
```

## access to next image

```
$ sudo docker ps
$ sudo docker exec -it <container_id_or_name> bash
```

## run test

```
$ ngrok http 3000
```