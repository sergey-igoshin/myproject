from flask import Flask, request, render_template, redirect, url_for
import pymysql.cursors
import json

app = Flask(__name__)

NAME = 'name'
# Подключиться к базе данных.
def get_data_new_db(idx):
    connection = pymysql.connect(
        db='new_db',
        host='127.0.0.1',
        user='newuser',
        password='Yourjuli01Yourjuli01!',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

    try:
        with connection.cursor() as cursor:
            sql = f"SELECT {NAME} FROM users WHERE id={idx}"
            cursor.execute(sql)
            res = cursor.fetchall()
            return res[0]
    except pymysql.err.OperationalError:
        return 'No database selected'
    finally:
        connection.close()


@app.route('/')
def index():
    r = get_data_new_db(2)
    name = name, age, profession = r[NAME], 24, 'Programmer'
    template_context = dict(name=name, age=age, profession=profession)
    return render_template('index.html', **template_context)


@app.route('/login')
def login():
    return '<h1>LOGIN</h1>'


@app.route('/<string:user>', methods=['GET'])
def get_blog_post(user):
    r = get_data_new_db(2)
    name = name, age, profession = r[NAME], user, 'Programmer'
    template_context = dict(name=name, age=age, profession=profession)
    return render_template('index.html', **template_context)


@app.route('/admin/')
def admin():
    r = get_data_new_db(1)
    if r['name'] != "Sergey":
        return redirect(url_for('login')) # если не залогинен, выполнять редирект на страницу входа
    # return render_template('index.html')
    
    name = name, age, profession = r[NAME], 'user', 'Programmer'
    template_context = dict(name=name, age=age, profession=profession)
    return render_template('index.html', **template_context)

    
if __name__ == "__main__":
    app.run(host='0.0.0.0')
