from wtforms import Form, StringField, validators

class UserForm(Form):
    email = StringField('email', [
        validators.Email(message="Please provide a correct email address"), 
        validators.InputRequired(message="Please provide an email address")
    ])

    password = StringField('password', [
        validators.InputRequired(message="Please provide a password"),
        validators.Length(min=6, message="Passwords should be longer than 6 characters")
    ])