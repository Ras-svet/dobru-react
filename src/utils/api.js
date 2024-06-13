import axios from "axios";

export class Api {
	constructor({url, headers}) {
		this._url = url;
		this._headers = headers;
	}

	_checkResponse(response) {
		return response.ok ? response.json() : response.json().then(errData => Promise.reject(errData))
	}

	_checkResponseStatus(response) {
		if (response.ok) {
			return response.json();
		}
		return Promise.reject(response.status);
	}

  _checkResponseAxios(response) {
    return response.status < 400 ? response.data : Promise.reject(response.data);
  }

	signUp(group, firstName, lastName, email, password, telegram, github) {
		console.log(this._url)
		return fetch(`${this._url}/signup`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({ group, firstName, lastName, email, password, telegram, github }),
		}).then(this._checkResponse)
	}

	signIn(email, password) {
		return fetch(`${this._url}/signin`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({ email, password }),
		}).then(this._checkResponse)
	}

	_getAuth() {
		const jwt = localStorage.getItem('jwt');
		return {
			'Authorization': `Bearer ${jwt}`,
			...this._headers,
		};
	}

	getControls() {
		return fetch(`${this._url}/controls`, {
			headers: this._getAuth(),
		}).then(this._checkResponse)
	}

  getLabs() {
		return fetch(`${this._url}/labs`, {
			headers: this._getAuth(),
		}).then(this._checkResponse)
	}

	getVariants() {
		return fetch(`${this._url}/controlvariants`, {
			headers: this._getAuth(),
		}).then(this._checkResponse)
	}

	getQuestions() {
		return fetch(`${this._url}/questions`, {
			headers: this._getAuth(),
		}).then(this._checkResponse)
	}

  getUsers() {
    return fetch(`${this._url}/access`, {
			headers: this._getAuth(),
		}).then(this._checkResponse)
  }

  openAccessToUser(userId) {
    return fetch(`${this._url}/access/${userId}`, {
			headers: this._getAuth(),
		}).then(this._checkResponse)
  }

  deleteAccessFromUser(userId) {
    return fetch(`${this._url}/access/${userId}`, {
			method: "DELETE",
			headers: this._getAuth()
		}).then(this._checkResponse)
  }

	getUserInfo() {
		return fetch(`${this._url}/users/me`, {
			headers: this._getAuth()
		}).then(this._checkResponse)
	}

  getTasks() {
    return fetch(`${this._url}/tasks`, {
			headers: this._getAuth()
		}).then(this._checkResponse)
  }

	addControl(name, subject, themes) {
		return fetch(`${this._url}/controls`, {
			method: "POST",
			headers: this._getAuth(),
			body: JSON.stringify({ name, subject, themes }),
		}).then(this._checkResponse)
	}

  addLab(name, subject, deadline, points, penaltyPoints) {
    return fetch(`${this._url}/labs`, {
			method: "POST",
			headers: this._getAuth(),
			body: JSON.stringify({ name, subject, deadline, points, penaltyPoints }),
		}).then(this._checkResponse)
  }

	generateVariant(controlName, controlId, easyCount, normalCount, hardCount) {
		return fetch(`${this._url}/controlVariants/${controlId}`, {
			method: "POST",
			headers: this._getAuth(),
			body: JSON.stringify({ controlName, easyCount, normalCount, hardCount })
		}).then(this._checkResponse)
	}

	deleteControlVariant(variantId) {
		return fetch(`${this._url}/controlVariants/${variantId}`, {
			method: "DELETE",
			headers: this._getAuth()
		}).then(this._checkResponse)
	}

	addGroup(controlId, groups) {
		return fetch(`${this._url}/controls/${controlId}`, {
			method: "POST",
			headers: this._getAuth(),
			body: JSON.stringify({ groups })
		}).then(this._checkResponse)
	}

	deleteGroup(controlId, group) {
		return fetch(`${this._url}/controls/${controlId}`, {
			method: "DELETE",
			headers: this._getAuth(),
			body: JSON.stringify({ group })
		}).then(this._checkResponse)
	}

  addGroupToLab(labId, groups) {
    return fetch(`${this._url}/labs/${labId}`, {
			method: "POST",
			headers: this._getAuth(),
			body: JSON.stringify({ groups })
		}).then(this._checkResponse)
  }

  deleteGroupFromLab(labId, group) {
    return fetch(`${this._url}/labs/${labId}`, {
			method: "DELETE",
			headers: this._getAuth(),
			body: JSON.stringify({ group })
		}).then(this._checkResponse)
  }

  addGroupToTask(taskId, groups) {
		return fetch(`${this._url}/tasks/${taskId}`, {
			method: "POST",
			headers: this._getAuth(),
			body: JSON.stringify({ groups })
		}).then(this._checkResponse)
	}

	deleteGroupFromTask(taskId, group) {
		return fetch(`${this._url}/tasks/${taskId}`, {
			method: "DELETE",
			headers: this._getAuth(),
			body: JSON.stringify({ group })
		}).then(this._checkResponse)
	}

  createQuestion(body) {
    return fetch(`${this._url}/questions`, {
			method: "POST",
			headers: this._getAuth(),
			body: JSON.stringify(body)
		}).then(this._checkResponse)
  }

  deleteQuestion(questionId) {
    return fetch(`${this._url}/questions/${questionId}`, {
			method: "DELETE",
			headers: this._getAuth(),
		}).then(this._checkResponse)
  }

  createLabVariant(labId, nameVariant, text, seats, file) {
    const formData = new FormData();
    
    formData.append('nameVariant', nameVariant);
    formData.append('text', text);
    formData.append('seats', seats);
    
    if (file) {
      formData.append('file', file); // Добавляем файл в formData, если он есть
    }
    return axios.post(`${this._url}/labs/variant/${labId}`, formData, {
      headers: {
        ...this._getAuth(),
        'Content-Type': 'multipart/form-data',
      },
    }).then(this._checkResponseAxios);
  }

  deleteLabVariant(labId, variantId) {
    return fetch(`${this._url}/labs/${labId}/${variantId}`, {
			method: "DELETE",
			headers: this._getAuth(),
		}).then(this._checkResponse)
  }

  deleteControl(controlId) {
    return fetch(`${this._url}/controls/delete/${controlId}`, {
			method: "DELETE",
			headers: this._getAuth(),
		}).then(this._checkResponse)
  }

  deleteLab(labId) {
    return fetch(`${this._url}/labs/delete/${labId}`, {
			method: "DELETE",
			headers: this._getAuth(),
		}).then(this._checkResponse)
  }

  deleteTask(taskId) {
    return fetch(`${this._url}/tasks/delete/${taskId}`, {
			method: "DELETE",
			headers: this._getAuth(),
		}).then(this._checkResponse)
  }

  createTask(name, text, seats, subject, deadline, points, file) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('text', text);
    formData.append('seats', seats);
    formData.append('subject', subject)
    formData.append('deadline', deadline)
    formData.append('points', points)
    
    if (file) {
      formData.append('file', file);
    }
    return axios.post(`${this._url}/tasks`, formData, {
      headers: {
        ...this._getAuth(),
        'Content-Type': 'multipart/form-data',
      },
    }).then(this._checkResponseAxios);
  }

  getControlMarks() {
    return fetch(`${this._url}/controlmarks`, {
			headers: this._getAuth(),
		}).then(this._checkResponse)
  }

  checkControl(controlmarkId, checkedPoints) {
    return fetch(`${this._url}/controlmarks/${controlmarkId}`, {
			method: "PATCH",
			headers: this._getAuth(),
			body: JSON.stringify({checkedPoints})
		}).then(this._checkResponse)
  }
}

const api = new Api({
	url: 'http://localhost:3001',
	headers: {
		'Content-Type': 'application/json'
	}
})

export default api;