import './Footer.css'
import github from '../../images/github.svg'
import tg from '../../images/tg.svg'

function Footer() {
  return (
    <footer className="footer">
      <h1 className="footer__title">Контакты</h1>
      <div className="footer__contacts">
        <a className="footer__contact" href="https://t.me/rassvet2002"  target="_blank" rel="noreferrer">
          <img className="footer__contact-image" alt="ссылка на телеграм" src={tg}/>
          <span className="footer__contact-span">Телеграм</span>
        </a>
        <a className="footer__contact" href="https://github.com/Ras-svet"  target="_blank" rel="noreferrer">
          <img className="footer__contact-image" alt="ссылка на Гитхаб" src={github}/>
          <span className="footer__contact-span">GitHub</span>
        </a>
      </div>
    </footer>
  )
}

export default Footer