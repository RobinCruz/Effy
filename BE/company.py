import uuid
import json

class Company:

	def __init__(self, companyName, companyAddress, coordinates, id = None):
		if (id is None):	
			self.id = uuid.uuid4().hex
		else:
			self.id = id
		self.companyName = companyName
		self.companyAddress = companyAddress
		self.coordinates = coordinates

	def __str__(self):
		return "The {cName} is situated at {cAddress} with coordinates {coord}".format(cName=self.companyName,
			cAddress=self.companyAddress, coord=self.coordinates)

	def toJson(self):
		return json.dumps(self, default=lambda company: company.__dict__)