import React, {Component} from 'react'
import {MdHome} from 'react-icons/md'
import {MdOutlineExplore} from 'react-icons/md'
import {FaBookmark} from 'react-icons/fa'
import {CgProfile} from 'react-icons/cg'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import ProductCard from '../ProductCard'
import Header from '../Header'
import TabItem from '../TabItem'

import './index.css'

const tabsList = [
  {tabId: 'All', displayText: 'All'},
  {tabId: 'LEVIS', displayText: 'Levis'},  
  {tabId: 'MAJIK', displayText: 'Majik'},
  {tabId: 'Amazon', displayText: 'Amazon'},
  {tabId: 'Nova', displayText: 'Nova'},
]
class Home extends Component {
  state = {
    news: [],
    activeTabId: tabsList[0].tabId,
  }

  componentDidMount() {
    this.getProducts()
  }
  onClickProfile = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/not-found',
    })
    history.replace('/not-found')
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
  clickTabItem = tabValue => {
    this.setState({activeTabId: tabValue})
  }

  getFilteredProjects = () => {
    const {activeTabId, news} = this.state
    const filteredProjects = news.filter(
      eachprojectDetails => eachprojectDetails.brand === activeTabId,
    )
    return filteredProjects
  }

  render() {
    const {activeTabId, news} = this.state
    const filteredProjects = this.getFilteredProjects()
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
            {tabsList.map(tabDetails => (
              <TabItem
                key={tabDetails.tabId}
                tabDetails={tabDetails}
                clickTabItem={this.clickTabItem}
                isActive={activeTabId === tabDetails.tabId}
              />
            ))}
          </ul>
          {activeTabId === 'All' ? (
            <ul className="products-list">
              {news.map(product => (
                <ProductCard productData={product} key={product.id} />
              ))}
            </ul>
          ) : (
            <ul className="products-list">
              {filteredProjects.map(product => (
                <ProductCard productData={product} key={product.id} />
              ))}
            </ul>
          )}
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
