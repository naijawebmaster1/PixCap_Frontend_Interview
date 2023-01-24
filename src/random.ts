// interface Employee{
//     uniqueId: number;
//     name:string;
//     subordinates : Employee[];
// }

// interface IEmployeeOrgApp{
//     ceo : Employee;
//     move(employeeID: number, supervisorID: number) : void;
//     undo() : void;
//     redo() : void;
// }



// const root = new Map() as Map<number, Employee[]>

// const insert = (supervisor : Employee, employee : Employee) =>{
//     supervisor.subordinates.push(employee);
//     // supervisor.subordinates.push(employee);
//     if(root.has(supervisor.uniqueId)){
//         const rootValue = root.get(supervisor.uniqueId);
//         rootValue?.push(employee);
//         root.set(supervisor.uniqueId, rootValue || []);
//     }
//     else{
//         root.set(supervisor.uniqueId, [employee]);
//     }
//     root.set(employee.uniqueId, []);
//     return employee;
// }


// const CEO : Employee = {
//     name : 'Mark',
//     uniqueId : 1,
//     subordinates : [

//     ]
// }


// const CPO = insert(CEO, {name : 'Steve', uniqueId : 2, subordinates : []})

// const CFO = insert(CEO, {name : 'Clement', uniqueId : 3, subordinates : []});

// const CTO = insert(CEO, {name : 'Caleb', uniqueId : 4, subordinates : []});

// const MARKETTING_LEAD = insert(CPO, {name : 'Emmanuel', uniqueId : 5, subordinates : []});

// const SUPPORT_LEAD = insert(CPO, {name : 'Deji', uniqueId : 6, subordinates : []})

// const COMPLIANCE_LEAD = insert(CFO, {name : 'Tolu', uniqueId : 7, subordinates : []})

// const MOBILE_LEAD = insert(CTO, {name : 'Sayo', uniqueId : 8, subordinates : []});

// const BACK_LEAD = insert(CTO, {name : 'Dev', uniqueId : 9, subordinates : []});

// const FRONT_LEAD = insert(CTO, {name : "seyi", uniqueId : 10, subordinates : []});


// console.log({root});

// console.log({CEO});

// class EmployeeOrgApp implements IEmployeeOrgApp{
//     ceo: Employee;

//     constructor(employee : Employee){
//         this.ceo = employee;
//     }

//     move(employeeID: number, supervisorID: number): void {
//         const employeeSubordinates = root.get(employeeID);
//         const supervisorSubordinates = root.get(supervisorID);
        
//     }
//     undo(): void {
//         throw new Error("Method not implemented.");
//     }
//     redo(): void {
//         throw new Error("Method not implemented.");
//     }
    
// }










