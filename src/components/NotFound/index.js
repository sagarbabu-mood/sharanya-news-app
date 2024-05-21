import './index.css'

const onClickNext = event => {
  event.preventdefault
}
const NotFound = () => {
  return (
    <div>
      <form className="not-found-container" onSubmit={onClickNext}>
        <input type="file" />
        <div>
          <label for="username" className="labelel">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="inputel"
            name="username"
            required
          />
        </div>
        <div>
          <label for="name" className="labelel">
            Full Name*
          </label>
          <input
            type="text"
            id="name"
            className="inputel"
            name="fullname"
            required
          />
        </div>
        <div>
          <label for="email" className="labelel">
            Email Address*
          </label>
          <input
            type="text"
            id="email"
            className="inputel"
            name="email"
            required
          />
        </div>
        <div>
          <label for="num" className="labelel">
            Phone Number*
          </label>
          <input type="text" id="num" className="inputel" name="num" required />
        </div>
        <button className="buttonelement">Next</button>
      </form>
    </div>
  )
}

export default NotFound
