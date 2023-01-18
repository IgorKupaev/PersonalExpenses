export const getAll = async () => {
    let result;
    await fetch('http://localhost:8000/allExpenses')
    .then((response) => response.json())
    .then((data) => {
      result = data;
    });
    return result;
}

export const createOne = async (item) => {
  try {
    item = JSON.stringify(item);
    await fetch('http://localhost:8000/expense', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: item
    })
  } catch (error) {
  }
}

export const removeOne = async (id) => {
  try {
    await fetch(`http://localhost:8000/removeExpense/${id}`,{
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  });
  } catch (error) {
  }
}

export const editOne = async (id, place, date, cost) => {
  try {
    let body = JSON.stringify({id, place, date, cost});
    console.log(body)
    await fetch('http://localhost:8000/editExpense', {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: body
    })
  } catch (error) {
  }
}