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

from flask import jsonify, request

@app.route('/api/dados_dashboard')
def dados_dashboard():
    db = get_db()
    cur = db.cursor()

    # Consulta 1: Peças pedidas
    cur.execute("""
        SELECT i.item, SUM(IP.quantidade) AS total
        FROM itens_pedido IP
        JOIN Itens i ON IP.id_item = i.id_item
        GROUP BY i.item;
    """)
    pecas_data = cur.fetchall()
    pecas = {
        "labels": [linha[0] for linha in pecas_data],
        "quantidades": [linha[1] for linha in pecas_data]
    }

    # Consulta 2: Pedidos por cliente
    cur.execute("""
        SELECT c.nome, COUNT(*) AS total
        FROM Pedidos p
        JOIN Clientes c ON p.id_cliente = c.id_cliente
        GROUP BY c.nome;
    """)
    clientes_data = cur.fetchall()
    clientes = {
        "labels": [linha[0] for linha in clientes_data],
        "quantidades": [linha[1] for linha in clientes_data]
    }

    return jsonify({"pecas": pecas, "clientes": clientes})




if __name__ == '__main__':
    app.run(debug=True)
