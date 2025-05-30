from flask import Flask, render_template, g
import sqlite3
app = Flask(__name__)

DATABASE = "pedidos.db"

app = Flask(__name__, template_folder='html')

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
        SELECT p.pedido_numero, c.nome, p.data_pedido
        FROM pedidos p
        JOIN clientes c ON c.id_cliente = p.id_cliente
    """)
    pedidos = cur.fetchall()
    return render_template('index.html', pedidos=pedidos)

if __name__ == '__main__':
    app.run(debug=True)
