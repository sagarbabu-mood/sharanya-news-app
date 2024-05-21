import './index.css'

const ProductCard = props => {
  const {productData} = props
  const {title, brand, imageUrl, rating, price} = productData

  return (
    <div className="product-item">
      <div>
        <img src={imageUrl} alt="product" className="thumbnail" />
      </div>
      <div>
        <h1 className="title">{title}</h1>
        <p className="brand">by {brand}</p>
        <p className="price">Rs {rating}/-</p>

        <p className="rating">{price}</p>
      </div>
    </div>
  )
}
export default ProductCard
