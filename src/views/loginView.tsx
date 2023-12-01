function LoginView(props: {name: string}) {
    return (
        <div>
        <h1>Welcome!</h1>
        <p>If the login process worked, your name is: {props.name}</p>
        </div>
    );
}

export default LoginView;