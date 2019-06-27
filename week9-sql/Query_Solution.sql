--1. List the following details of each employee: employee number, last name, first name, gender, and salary.

Select e.emp_no, first_name, last_name, gender, salary from employees e, salaries s where e.emp_no = s.emp_no


--2. List employees who were hired in 1986.

select first_name, last_name,hire_date  from employees where extract (year from hire_date) = 1986 


--3. List the manager of each department with the following information: 
--department number, department name, the manager's employee number, last name, first name, and start and end employment dates.

Select dep.*,first_name as Manager_FirstName,last_name as Manager_LastName,e.emp_no,d.from_date,d.to_date 
from employees e,dept_manager d,departments dep 
where e.emp_no = d.emp_no and d.dept_no = dep.dept_no


--4. List the department of each employee with the following information: employee number, last name, first name, and department name.

Select e.emp_no,first_name as Employee_FirstName,last_name as Employee_LastName,dep.dept_name
from employees e,departments dep,dept_emp de 
where e.emp_no = de.emp_no and de.dept_no = dep.dept_no

--5. List all employees whose first name is "Hercules" and last names begin with "B."

select first_name, last_name from employees where last_name like 'B%' and first_name = 'Hercules'

--6. List all employees in the Sales department, including their employee number, last name, first name, and department name.

Select e.emp_no,first_name as Employee_FirstName,last_name as Employee_LastName,dep.dept_name
from employees e,departments dep,dept_emp de 
where e.emp_no = de.emp_no and de.dept_no = dep.dept_no and dept_name = 'Sales'

--7. List all employees in the Sales and Development departments, including their employee number, last name, first name, and department name.

Select e.emp_no,first_name as Employee_FirstName,last_name as Employee_LastName,dep.dept_name
from employees e,departments dep,dept_emp de 
where e.emp_no = de.emp_no and de.dept_no = dep.dept_no and (dept_name = 'Sales' or dept_name = 'Development')

--8. In descending order, list the frequency count of employee last names, i.e., how many employees share each last name.

select last_name, count(*)
from employees 
group by last_name 
having count(*)>=0 
order by count(*) desc