from sqwak import app

app.config['DEBUG'] = False
app.run(host='0.0.0.0', port=8080)