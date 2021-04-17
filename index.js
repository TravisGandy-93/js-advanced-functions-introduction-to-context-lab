// Your code here

function createEmployeeRecord(array){
    var employee = {firstName: array[0],
                    familyName: array[1],
                    title: array[2],
                    payPerHour: array[3],
                    timeInEvents: [],
                    timeOutEvents: []}
        return employee
}

function createEmployeeRecords(array){
    array.map(createEmployeeRecord)
}

function createDSObj(getType, dateTime) {
    return {type: getType, date: dateTime.slice(0,10), hour: parseInt(dateTime.slice(-4))}
}

function createTimeInEvent(obj, dateTime){
    obj.timeInEvents.push(createDSObj("TimeIn", dateTime))
    return obj
}


function createTimeOutEvent(obj, dateTime){
    obj.timeOutEvents.push(createDSObj("TimeOut", dateTime))
    return obj
}

function hoursWorkedOnDate(obj, dateYMD){
    const timeIn = obj.timeInEvents.find((e) => e.date === dateYMD).hour
    const timeOut = obj.timeOutEvents.find((e) => e.date === dateYMD).hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(obj, dateYMD){
    const wage = obj.payPerHour
    const hoursWorked = hoursWorkedOnDate(obj, dateYMD)
    return wage * hoursWorked
}

function allWagesFor(obj){
    const allWages = obj.timeInEvents.map((day) => {return wagesEarnedOnDate(obj, day.date)})
    return allWages.reduce((acc, cv) => acc + cv)
}

function calculatePayroll(records){
    const allPay = (records.map((empl) => {return allWagesFor(empl)}))
    return allPay.reduce((acc, cv) => acc + cv)
}

function findEmployeeByFirstName(srcArray, first_Name){
    return srcArray.find((record) => record.firstName === first_Name)
}
