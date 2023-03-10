
def getCompanyJsonMinimal(companyTuple):
    if len(companyTuple) == 0:
        return {}
    return {
        "id": companyTuple[0],
        "name": companyTuple[1]
    }

def getCompanyJson(companyTuple, userList):
    if len(companyTuple) == 0:
        return {}
    userListResult = []
    for user in userList:
        userListResult.append(getUserJsonMinimal(user))
    return {
        "id": companyTuple[0],
        "companyname": companyTuple[1],
        "companyaddress": companyTuple[2],
        "coordinates": companyTuple[3],
        "usersList": userListResult
    }

def getUserJsonMinimal(userTuple):
    if len(userTuple) == 0:
        return {}
    return {
        "id": userTuple[0],
        "name": userTuple[1]+" "+userTuple[2],
        "active": userTuple[6]
    }

def getUserJson(userTuple, company_id):
    if len(userTuple) == 0:
        return {}
    return {
        "id": userTuple[0],
        "firstname": userTuple[1],
        "lastname": userTuple[2],
        "email": userTuple[3],
        "designation": userTuple[4],
        "dob": userTuple[5],
        "active": userTuple[6],
        "company_id": company_id
    }
    