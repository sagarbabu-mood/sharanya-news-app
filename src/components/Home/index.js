import React, {Component} from 'react'
import {MdHome} from 'react-icons/md'
import {MdOutlineExplore} from 'react-icons/md'
import {FaBookmark} from 'react-icons/fa'
import {CgProfile} from 'react-icons/cg'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import ProductCard from '../ProductCard'
import Header from '../Header'
import './index.css'

class Home extends Component {
  state = {
    news: [],
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/products'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        news: updatedData,
      })
    }
  }

  onClickProfile = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/not-found',
    })
    history.replace('/not-found')
  }

  render() {
    const {news} = this.state
    return (
      <>
        <Header />
        <div className="home-container">
          <input type="search" className="searchcontainer" />
          <div className="trendingupper">
            <p className="trending">Trending</p>
            <a href="https://www.bbc.com/news/world" target="_blank">
              see all
            </a>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
            className="trendingimage"
          />
          <div className="trendingupper">
            <p className="trending">Latest</p>
            <a href="https://www.bbc.com/news/world" target="_blank">
              see all
            </a>
          </div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to={news.brand}
              >
                All
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to={'news.brand'}
              >
                MAJIK
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={news.brand}>
                LEVIS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={news.brand}>
                Mufti
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={news.brand}>
                Nova
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={news.brand}>
                Amazon
              </Link>
            </li>
          </ul>
          <ul className="products-list">
            {news.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
          <footer className="footersec">
            <div className="footercontainers">
              <MdHome size="20" />
              <p>Home</p>
            </div>
            <div className="footercontainers">
              <MdOutlineExplore size="20" />
              <p>Explore</p>
            </div>
            <div className="footercontainers">
              <FaBookmark size="20" />
              <p>BookMark</p>
            </div>
            <div className="footercontainers">
              <CgProfile size="20" />
              <p onClick={this.onClickProfile} type="button">
                Profile
              </p>
            </div>
          </footer>
        </div>
      </>
    )
  }
}

export default withRouter(Home)
