from flask import Flask, render_template, g
import sqlite3
from datetime import datetime

app = Flask(__name__, template_folder='html')
DATABASE = "pedidos.db"

# Filtro customizado para formatar datas
@app.template_filter('datetimeformat')
def datetimeformat(value):
    try:
        return datetime.strptime(value, '%Y-%m-%d').strftime('%b %d, %Y')
    except Exception:
        return value

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route('/')
def pedidos():
    cur = get_db().cursor()
    cur.execute("""
        SELECT 
            'Aberto' AS status,
            p.pedido_numero,
            c.nome AS nome_cliente,
            p.data_pedido
        FROM Pedidos p
        JOIN Clientes c ON p.id_cliente = c.id_cliente;
    """)
    pedidos = cur.fetchall()
    return render_template('index.html', pedidos=pedidos)

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/novo-pedido')
def novo_pedido():
     return render_template('user_form.html')

if __name__ == '__main__':
    app.run(debug=True)
