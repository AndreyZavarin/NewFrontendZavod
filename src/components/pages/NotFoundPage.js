import React from 'react'

const NotFoundPage = () => (
  <div className="row">
    <div className="middle">

      <div className="main">
        <div className="error-first">
          <img src="../../img/empty-purse.jpg"/>
        </div>
        <div className="error-second">
          <div>
            <h1>Ошибка 404</h1>
          </div>
          <div>
            <h2>Страница не найдена.</h2>
          </div>
          <div>
            <p>Неправильно набран адрес, или такой страницы на сайте не существует.</p>
          </div>
          <div>
            <span>
              <a href="/">Главная страница</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default NotFoundPage

