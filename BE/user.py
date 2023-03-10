import uuid
import json

class User:

	def __init__(self, firstName, lastName, email, designation, dob, active=0, id = None):
		if (id is None):	
			self.id = uuid.uuid4().hex
		else:
			self.id = id
		self.firstName = firstName
		self.lastName = lastName
		self.email = email
		self.designation = designation
		self.dob = dob
		self.active = active

	def __str__(self):
		return "{fName} {lName} is a {designation} who can be contacted via {email}".format(
			fName=self.firstName, lName=self.lastName, designation=self.designation, email=self.email)

	def toJson(self):
		return json.dumps(self, default=lambda user: user.__dict__)