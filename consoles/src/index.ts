import { ClientNats } from "@nestjs/microservices"

(async () => {
    const client = new ClientNats({
        url: "nats://localhost:4222"
    });
    await client.connect();
    console.log("Connected");

    client.send(
        { service: "user", cmd: "getById" }, { payload: 1 }
    ).toPromise()
    .then(rep => console.log(rep))
    .catch(err => console.log(err))
})()