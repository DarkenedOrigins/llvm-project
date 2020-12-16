from flask import Flask, request

app = Flask(__name__)

@app.route("/")
def index():
	return "Hello World\n"

@app.route("/upload", methods=['POST'])
def upload():
	fname = request.args['llname']
	try:
		with open('./' + fname , 'wb') as f:
			request.files['file'].save(f)
		return "file saved!\n", 201
	except:
		return "file unable to be saved\n", 500


@app.route("/upload/<fname>", methods=['POST'])
def upload2(fname):
	try:
		with open('./' + fname , 'wb') as f:
			request.files['file'].save(f)
		return "file saved!\n", 201
	except:
		return "file unable to be saved\n", 500


if __name__ == '__main__':
	app.run(debug=True)
