from wtforms import Form, StringField, validators

class NewMlAppForm(Form):
    app_name = StringField('app_name', [validators.InputRequired(message="Please provide an app name")])