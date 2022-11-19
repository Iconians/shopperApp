import React from "react";

const ItemPage = ({ product, show }) => {
  const showHideClass = show ? "display-block" : "display-none";
  setTimeout(() => {
    console.log(product);
    return (
      <div className={showHideClass}>
        <div>
          {!undefined ? (
            product.map((product) => (
              <div>
                <div>
                  <img src={product.img} alt="" />
                </div>
                <div>
                  <div>
                    <h2>{product.title}</h2>
                  </div>
                  <div>
                    <div>{product.price}</div>
                  </div>
                  <div>
                    <p>{product.desc}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>...Loading</div>
          )}
        </div>
      </div>
    );
  }, 10000);

  // return (
  //   <div className={showHideClass}>
  //     <div>
  //       {!undefined ? (
  //         product.map((product) => (
  //           <div>
  //             <div>
  //               <img src={product.img} alt="" />
  //             </div>
  //             <div>
  //               <div>
  //                 <h2>{product.title}</h2>
  //               </div>
  //               <div>
  //                 <div>{product.price}</div>
  //               </div>
  //               <div>
  //                 <p>{product.desc}</p>
  //               </div>
  //             </div>
  //           </div>
  //         ))
  //       ) : (
  //         <div>...Loading</div>
  //       )}
  //     </div>
  //   </div>
  // );
};

export default ItemPage;
