import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


class CampsiteInfo extends React.Component {
        constructor(props) {
        super(props)
        }


        renderCampsite(campsite) {
            return (<div className="col-md-5 m-1">
              <Card>
                  <CardImg top src={campsite.image} alt={campsite.name} />
                 <CardBody>
                      <CardTitle>{campsite.name}</CardTitle>
                     <CardText>{campsite.description}</CardText>
                  </CardBody>
              </Card>
            </div>

            )

      };

      renderComments(comments) {
           if (comments) {
                return(
                    <div class="col-md-5 m-1">
                        <h4> Comments </h4> <hr/>
                        {comments.map(comment => 
                            <div key={comment.id} className="m-2">
                            {comment.text}
                            <br />
                            -- {comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}                           
                            </div>
                        )}
                        </div>
                    )
                }
              return <div />
            
         }

    render() {
        if(this.props.campsite != null) {
            return(
                <div className="Container">
                    <div className="row"> 
                        {this.renderCampsite(this.props.campsite)}
                        {this.renderComments(this.props.campsite.comments)}
                    </div>
                </div>
            )
        } else {
            return <div></div>
           

        }
                     
    }                    

};

//    



//      renderCampsite(campsite) {
//           return (<div class="col-md-5 m-1">)
//               <Card>
//                   <CardImg top src={campsite.image} alt={campsite.name} />
//                   <CardBody>
//                       <CardTitle>{campsite.name}</CardTitle>
//                       <CardText>{campsite.description}</CardText>
//                   </CardBody>
//               </Card>
//           </div>

//           )

//       };


//        render() {
//         //  console.log("hi")
        
//                 {this.renderCampsite.campsite}

//             </div>
//             )

        
//         }
//     }
// };



export default CampsiteInfo;