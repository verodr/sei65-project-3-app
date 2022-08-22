import image from '../styles/images/LinkedIn-logo.png'

const Footer = () => {
  return (
    <div className="footer-main">
      <div className="footer-header">Brought to you by:</div>
      <div className="footer-container"> 
        <div className="Mark" href="https://github.com/markmuy40" target="_blank" rel="noreferrer">Mark Muyuela
          <div className="Logo"><a href="https://www.linkedin.com/in/mark-muyuela/" target="_blank" rel="noreferrer"><img src={image} height="50px"></img></a></div>
        </div>
        <div className="Rokas" href="https://github.com/rokster112" target="_blank" rel="noreferrer">Rokas Arlauskas
          <div className="Logo"><a href="https://www.linkedin.com/in/rokas-arlauskas-8772b6244/" target="_blank" rel="noreferrer"><img src={image} height="50px"></img></a></div>
        </div>
        <div className="Veronica" href="https://github.com/verodr" target="_blank" rel="noreferrer">Veronica DeRonzi
          <div className="Logo"><a href="https://www.linkedin.com/in/veronica-de-ronzi-019173185/" target="_blank" rel="noreferrer"><img src={image} height="50px"></img></a></div>
        </div>
      </div>
    </div>  
      
  )
  
}

export default Footer