import React, { Fragment, useState } from "react"
import { Button, TextField, Card, CardContent, Container } from "@material-ui/core";
import DocumentTitle from "../../../../components/DocumentTitle";
import LoginStyles from "./Login.styles";

type props = {}
const Login = (props: props) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const classes = LoginStyles();
    return (
        <Fragment>
            <DocumentTitle title="Login Page" />
            <main>
                <Container maxWidth="xs">
                    <Card>
                        <CardContent>
                            <form
                                onSubmit={async (ev) => {

                                }}
                            >
                                <div className={classes.form}>
                                    <TextField
                                        type="email"
                                        margin="normal"
                                        fullWidth
                                        required
                                        label="Courriel"
                                        autoFocus
                                        autoComplete="email"
                                        value={email}
                                        onChange={ev => setEmail(ev.target.value)}
                                    />
                                    <TextField
                                        type="password"
                                        autoComplete="current-password"
                                        margin="normal"
                                        fullWidth
                                        required
                                        label="Mot de passe"
                                        value={password}
                                        onChange={ev => setPassword(ev.target.value)}
                                    />
                                </div>
                                <Button type="submit" fullWidth variant="contained" color="primary">
                                    Se connecter
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Container>
            </main>
        </Fragment>
    )
}
Login.displayName = "Login";

export default Login;