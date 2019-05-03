# momentum-dashboard

User Router:

Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/register` | POST | **Body**<br>name: `String`<br>email: `String`<br>password: `String` | **Success**<br>`201` Created<br>**Fail**<br>`500` Internal Server Error | Create a user
`/login` | POST | **Body**<br>email: `String`<br>password: `String` | `200` OK<br>**Fail**<br>`401` Authorization Error | Sign a user in
`/users` | GET | `none` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Get all users
`/users/:id` | GET | **Headers**<br>id: `String` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Get one user
`/users/:id` | PUT | **Headers**<br>id: `String`<br>**Body**<br>name: `String`<br>email: `String`<br>password: `String` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Update one user
`/users/:id` | DELETE | **Headers**<br>id: `String` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Delete a user
