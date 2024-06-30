function sendRequest(url, method, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      }
    };
    xhr.send(JSON.stringify(data));
  }
  
  // Функция для отображения списка рубрик
  function renderCategories(categories) {
    var categoryList = document.getElementById('category-list');
    categoryList.innerHTML = '';
  
    categories.forEach(function(category) {
      var categoryItem = document.createElement('div');
      categoryItem.innerHTML = `
        <h3>${category.name}</h3>
        <p>${category.description}</p>
        <button onclick="editCategory(${category.id})">Редактировать</button>
        <button onclick="deleteCategory(${category.id})">Удалить</button>
      `;
      categoryList.appendChild(categoryItem);
    });
  }
  
  // Функция для создания/редактирования рубрики
  function saveCategory(event) {
    event.preventDefault();
  
    var categoryId = document.getElementById('category-id').value;
    var categoryName = document.getElementById('category-name').value;
    var categorySlug = document.getElementById('category-slug').value;
    var categoryDescription = document.getElementById('category-description').value;
    var categoryImage = document.getElementById('category-image').value;
  
    var categoryData = {
      id: categoryId,
      name: categoryName,
      slug: categorySlug,
      description: categoryDescription,
      image: categoryImage
    };
  
    sendRequest('/api/categories', 'POST', categoryData, function(response) {
      // Обработка ответа от сервера
      // Можно обновить список рубрик или выполнить другие действия
    });
  }
  
  // Функция для редактирования рубрики
  function editCategory(categoryId) {
    // Запрос на получение данных рубрики по её ID
    sendRequest('/api/categories/' + categoryId, 'GET', null, function(response) {
      // Заполнение формы данными рубрики
      document.getElementById('category-id').value = response.id;
      document.getElementById('category-name').value = response.name;
      document.getElementById('category-slug').value = response.slug;
      document.getElementById('category-description').value = response.description;
      document.getElementById('category-image').value = response.image;
    });
  }
  
  // Функция для удаления рубрики
  function deleteCategory(categoryId) {
    // Запрос на удаление рубрики по её ID
    sendRequest('/api/categories/' + categoryId, 'DELETE', null, function(response) {
      // Обработка ответа от сервера
      // Можно обновить список рубрик или выполнить другие действия
    });
  }
  
  // Получение списка рубрик при загрузке страницы
  sendRequest('/api/categories', 'GET', null, function(response) {
    renderCategories(response);
  });
  
  // Обработка отправки формы
  document.getElementById('category-form').addEventListener('submit', saveCategory);