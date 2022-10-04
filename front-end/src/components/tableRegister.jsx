import React, { useEffect, useState } from 'react';
import requestDeleteUser from '../services/requestDeleteUser';
import requestGetAllUser from '../services/requestGetAlUser';
import getFromLocalStorage from '../helpers/getFromLocalStorage';

export default function TableRegister() {
  const [user, setUser] = useState([]);

  const handle = async () => {
    const result = await requestGetAllUser();
    setUser(result);
  };

  const removeUser = async (email) => {
    console.log(email);
    const { token } = getFromLocalStorage('user');
    await requestDeleteUser(email, token);
  };
  useEffect(() => {
    handle();
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Execluir</th>
          </tr>
        </thead>

        <tbody>
          {user?.map((element, i) => (
            <tr key={ i }>
              <td
                data-testid={ `admin_manage__element-user-table-item-number-${i}` }
              >
                {i + 1}
              </td>
              <td
                data-testid={ `admin_manage__element-user-table-name-${i}` }
              >
                {element.name}
              </td>
              <td
                data-testid={ `admin_manage__element-user-table-email-${i}` }
              >
                {element.email}
              </td>
              <td
                data-testid={ `admin_manage__element-user-table-role-${i}` }
              >
                {element.role}
              </td>
              <td>
                <button
                  type="button"
                  onClick={ () => removeUser(element.email) }
                  data-testid={ `admin_manage__element-user-table-remove-${i}` }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}
