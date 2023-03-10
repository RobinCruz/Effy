import sqlite3
import json
from company import Company

def initiate():
	connection = sqlite3.connect("effy.sqlite3")
	cursor = connection.cursor()

	cursor.execute('''CREATE TABLE IF NOT EXISTS COMPANY(
		id TEXT PRIMARY KEY NOT NULL,
		companyname TEXT NOT NULL,
		companyaddress TEXT NOT NULL,
		coordinates TEXT NOT NULL);''')

	cursor.execute('''CREATE TABLE IF NOT EXISTS USER(
		id TEXT PRIMARY KEY NOT NULL,
		firstname TEXT NOT NULL,
		lastname TEXT,
		email TEXT NOT NULL,
		designation TEXT NOT NULL,
		dob TEXT NOT NULL,
		active BOOLEAN NOT NULL);''')

	cursor.execute('''CREATE TABLE IF NOT EXISTS COMPANY_USER(
		company_id TEXT NOT NULL,
		user_id TEXT NOT NULL UNIQUE,
		CONSTRAINT fk_company FOREIGN KEY (company_id) REFERENCES COMPANY(id) ON DELETE CASCADE,
		CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES USER(id) ON DELETE CASCADE);''')

	connection.commit()
	cursor.connection.close()

def getCompanies():
	cursor = sqlite3.connect("effy.sqlite3").cursor()

	cursor.execute("SELECT * FROM COMPANY")

	companies = cursor.fetchall()
	return companies

def getCompanyById(company_id):
	cursor = sqlite3.connect("effy.sqlite3").cursor()

	cursor.execute("SELECT * FROM COMPANY WHERE id = ?", (company_id,))

	company = cursor.fetchone()
	return company

def createCompany(company):
	connection = sqlite3.connect("effy.sqlite3")
	cursor = connection.cursor()

	cursor.execute("INSERT INTO COMPANY VALUES(?,?,?,?)",
		(company.id, company.companyName, company.companyAddress, company.coordinates))
	connection.commit()
	
	return company.id

def updateCompany(company):
	connection = sqlite3.connect("effy.sqlite3")
	cursor = connection.cursor()

	cursor.execute("UPDATE COMPANY SET companyname = ?, companyaddress = ?, coordinates = ? WHERE id = ?",
		(company.companyName, company.companyAddress, company.coordinates, company.id))
	res = cursor.rowcount
	connection.commit()

	return res

def getUsersOfCompany(company_id):
	cursor = sqlite3.connect("effy.sqlite3").cursor()

	cursor.execute("SELECT * FROM COMPANY_USER WHERE company_id = ?", (company_id,))

	return cursor.fetchall()

def addUserToCompany(company_id, user_id):
	connection = sqlite3.connect("effy.sqlite3")
	cursor = connection.cursor()
	cursor.execute("DELETE FROM COMPANY_USER WHERE user_id = ?", (user_id,))
	cursor.execute("INSERT INTO COMPANY_USER VALUES(?,?)", (company_id, user_id))
	cursor.execute("UPDATE USER SET active = 1 WHERE id = ?", (user_id,))
	res = cursor.rowcount
	connection.commit()
	return res

def removeUserFromCompany(user_id):
	connection = sqlite3.connect("effy.sqlite3")
	cursor = connection.cursor()

	cursor.execute("DELETE FROM COMPANY_USER WHERE user_id = ?", (user_id,))
	cursor.execute('UPDATE USER SET active = 0 WHERE id = ?', (user_id,))
	connection.commit()
	res = cursor.rowcount
	return res

def deleteCompany(company_id):
	connection = sqlite3.connect("effy.sqlite3")
	cursor = connection.cursor()

	user_ids = getUserIDListByCompanyID(company_id)
	deactivateUser(tuple(user_ids))
	cursor.execute("DELETE FROM COMPANY WHERE id = ?", (company_id,))
	res = cursor.rowcount
	connection.commit()
	return res


def getUsers():
	cursor = sqlite3.connect("effy.sqlite3").cursor()

	cursor.execute("SELECT * FROM USER")

	users = cursor.fetchall()
	return users

def getUserIDListByCompanyID(company_id):
	cursor = sqlite3.connect("effy.sqlite3").cursor()

	cursor.execute("SELECT id FROM USER WHERE id in (SELECT user_id FROM COMPANY_USER WHERE company_id = ?)", (company_id,))
	
	userIDs = cursor.fetchall()
	return userIDs

def getUserById(user_id):
	cursor = sqlite3.connect("effy.sqlite3").cursor()

	cursor.execute("SELECT * FROM USER WHERE id = ?", (user_id,))

	user = cursor.fetchone()
	cursor.execute("SELECT company_id FROM COMPANY_USER WHERE user_id = ?", (user_id,))
	company_id = cursor.fetchone()
	return (user, company_id)

def createUser(user):
	connection = sqlite3.connect("effy.sqlite3")
	cursor = connection.cursor()

	cursor.execute("INSERT INTO USER VALUES(?,?,?,?,?,?,?)",
		(user.id, user.firstName, user.lastName, user.email, user.designation, user.dob, 0))

	connection.commit()
	return user.id

def updateUser(user):
	connection = sqlite3.connect("effy.sqlite3")
	cursor = connection.cursor()

	cursor.execute("UPDATE USER SET firstname = ?, lastname = ?, email = ?, designation = ?, dob = ?, active = ? WHERE id = ?",
		(user.firstName, user.lastName, user.email, user.designation, user.dob, user.active, user.id))
	connection.commit()
	res = cursor.rowcount

	return res

def deactivateUser(user_ids):
	connection = sqlite3.connect("effy.sqlite3")
	cursor = connection.cursor()
	cursor.execute('UPDATE USER SET active = 0 WHERE id IN (%s)' %
					','.join('?'*len(user_ids)), user_ids)
	res = cursor.rowcount
	connection.commit()

	return res

def deleteUser(user_id):
	connection = sqlite3.connect("effy.sqlite3")
	cursor = connection.cursor()

	cursor.execute("DELETE FROM USER WHERE id = ?", (user_id,))
	res = cursor.rowcount
	connection.commit()
	return res

def getUserListByCompanyID(company_id):
	cursor = sqlite3.connect("effy.sqlite3").cursor()

	user_ids = getUserIDListByCompanyID(company_id)
	user_ids_tuple = ()
	for user_id in user_ids:
		user_ids_tuple = user_ids_tuple + user_id
	print(user_ids_tuple)
	userList = []
	if len(user_ids) > 0:
		userList = cursor.execute('SELECT * FROM USER WHERE id IN (%s)' %','.join('?'*len(user_ids_tuple)), user_ids_tuple)

	return userList
