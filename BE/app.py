from company import Company
from user import User
import database
from localutils import *
import sqlite3

from flask import *

app = Flask(__name__)


@app.route('/companies', methods=['GET'])
def getCompanyList():
	try:
		result = {}
		database.initiate()
		companies = database.getCompanies()
		companiesList = []
		for company in companies:
			companiesList.append(getCompanyJsonMinimal(company))
		result['companies'] = companiesList
		return result
	except sqlite3.Error as err:
		abort(make_response(jsonify(message=str(err)), 400))
	except Exception as e:
		abort(make_response(jsonify(message=str(e)), 500))

@app.route('/company/<company_id>', methods=['GET'])
def getCompanyById(company_id):
	try:
		company = database.getCompanyById(company_id)
		if (company is None):
			abort(make_response(jsonify(message="No such company"), 404))
		userList = database.getUserListByCompanyID(company_id)
		
		return getCompanyJson(company, userList)
	except sqlite3.Error as err:
		abort(make_response(jsonify(message=str(err)), 400))
	except Exception as e:
		abort(make_response(jsonify(message=str(e)), 500))

@app.route('/company', methods=['POST'])
def createCompany():
	try:
		companyJson = request.get_json(force=True)
		if ("companyname" not in companyJson or "companyaddress" not in companyJson or "coordinates" not in companyJson):
			abort(make_response(jsonify(message="Provide companyname, companyaddress and coordinates"), 400))

		company = Company(companyJson["companyname"],
						companyJson["companyaddress"],
						companyJson["coordinates"])
		database.createCompany(company)

		return jsonify(message="success")
	except sqlite3.Error as err:
		abort(make_response(jsonify(message=str(err)), 400))
	except Exception as e:
		abort(make_response(jsonify(message=str(e)), 500))

@app.route('/company/<company_id>', methods=['PUT'])
def updateCompany(company_id):
	try:
		companyJson = request.get_json(force=True)
		if ("companyname" not in companyJson or "companyaddress" not in companyJson or "coordinates" not in companyJson):
			abort(make_response(jsonify(message="Provide companyname, companyaddress and coordinates"), 400))

		company = Company(companyJson["companyname"],
						companyJson["companyaddress"],
						companyJson["coordinates"],
						company_id)
		res = database.updateCompany(company)
		if res > 0:
			return jsonify(message="Update Successful")
		else:
			return jsonify(message="No update took place")
	except sqlite3.Error as err:
		abort(make_response(jsonify(message=str(err)), 400))
	except Exception as e:
		abort(make_response(jsonify(message=str(e)), 500))

@app.route('/user_company/<user_id>', methods=['POST'])
def addUserToCompany(user_id):
	try:
		usercompanyJson = request.get_json(force=True)
		if ("company_id" not in usercompanyJson):
			abort(make_response(jsonify(message="Provide company_id"), 400))

		res = database.addUserToCompany(usercompanyJson["company_id"], user_id)

		if res > 0:
			return jsonify(message="Addition Successful")
		else:
			return jsonify(message="No addition took place")
	except sqlite3.Error as err:
		abort(make_response(jsonify(message=str(err)), 400))
	except Exception as e:
		abort(make_response(jsonify(message=str(e)), 500))

@app.route('/user_company/<user_id>', methods=['DELETE'])
def removeUserFromCompany(user_id):
	try:
		res = database.removeUserFromCompany(user_id)

		if res > 0:
			return jsonify(message="Removal Successful")
		else:
			return jsonify(message="No removal took place")
	except sqlite3.Error as err:
		abort(make_response(jsonify(message=str(err)), 400))
	except Exception as e:
		abort(make_response(jsonify(message=str(e)), 500))

@app.route('/company/<company_id>', methods=['DELETE'])
def deleteCompany(company_id):
	try:
		res = database.deleteCompany(company_id)
		if res > 0:
			return jsonify(message="Delete Successful")
		else:
			return jsonify(message="No deletion took place")
	except sqlite3.Error as err:
		abort(make_response(jsonify(message=str(err)), 400))
	except Exception as e:
		abort(make_response(jsonify(message=str(e)), 500))

@app.route('/users', methods=['GET'])
def getUserList():
	try:
		users = database.getUsers()
		result = {}
		usersList = []
		for user in users:
			usersList.append(getUserJsonMinimal(user))
		result['usersList'] = usersList
		return result
	except sqlite3.Error as err:
		abort(make_response(jsonify(message=str(err)), 400))
	except Exception as e:
		abort(make_response(jsonify(message=str(e)), 500))

@app.route('/user/<user_id>', methods=['GET'])
def getUserById(user_id):
	try:
		user, company_id = database.getUserById(user_id)
		if (user is None):
			abort(make_response(jsonify(message="No such user"), 404))
		return getUserJson(user, company_id)
	except sqlite3.Error as err:
		abort(make_response(jsonify(message=str(err)), 400))
	except Exception as e:
		abort(make_response(jsonify(message=str(e)), 500))

@app.route('/user', methods=['POST'])
def createUser():
	try:
		userJson = request.get_json(force=True)
		if ("firstname" not in userJson or "lastname" not in userJson or "email" not in userJson
			or "designation" not in userJson or "dob" not in userJson):
			abort(make_response(jsonify(message="Provide firstname, lastname, email, designation and dob"), 400))
		user = User(userJson["firstname"],
						userJson["lastname"],
						userJson["email"],
						userJson["designation"],
						userJson["dob"])
		database.createUser(user)
		return jsonify(message="success")
	except sqlite3.Error as err:
		abort(make_response(jsonify(message=str(err)), 400))
	except Exception as e:
		abort(make_response(jsonify(message=str(e)), 500))

@app.route('/user/<user_id>', methods=['PUT'])
def updateUser(user_id):
	try:
		userJson = request.get_json(force=True)
		if ("firstname" not in userJson or "lastname" not in userJson or "email" not in userJson
			or "designation" not in userJson or "dob" not in userJson or "active" not in userJson):
			abort(make_response(jsonify(message="Provide firstname, lastname, email, designation, dob and active"), 400))
		user = User(userJson["firstname"],
						userJson["lastname"],
						userJson["email"],
						userJson["designation"],
						userJson["dob"],
						userJson["active"],
						user_id)
		res = database.updateUser(user)

		if res > 0:
			return jsonify(message="Update Successful")
		else:
			return jsonify(message="No update took place")
	except sqlite3.Error as err:
		abort(make_response(jsonify(message=str(err)), 400))
	except Exception as e:
		abort(make_response(jsonify(message=str(e)), 500))

@app.route('/user/<user_id>', methods=['DELETE'])
def deleteUser(user_id):
	try:
		res = database.deleteUser(user_id)
		if res > 0:
			return jsonify(message="Delete Successful")
		else:
			return jsonify(message="No deletion took place")
	except sqlite3.Error as err:
		abort(make_response(jsonify(message=str(err)), 400))
	except Exception as e:
		abort(make_response(jsonify(message=str(e)), 500))

@app.route('/user/<user_id>/deactivation', methods=['PUT'])
def deactivateUser(user_id):
	try:
		res = database.deactivateUser((user_id,))
		if res > 0:
			return jsonify(message="User Deactivated")
		else:
			return jsonify(message="No update took place")
	except sqlite3.Error as err:
		abort(make_response(jsonify(message=str(err)), 400))
	except Exception as e:
		abort(make_response(jsonify(message=str(e)), 500))

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  return response

if __name__ == '__main__':
	app.run()