import { request, response } from 'express';
import { RoomType, Design, Design_image, DesignFeedback, DesignFav } from '../MODEL/design.model.js';
import Professional from '../MODEL/professional.model.js';
import User from '../MODEL/user.model.js';
import xlsx from 'xlsx';

export const roomTypeExcel = async (request, response, next) => {
    // const { filename } = request.file;
    const workbook = xlsx.readFile('roomType_images.xlsx');

    const sheet_name = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheet_name];
    console.log(request.body);

    // Convert the sheet to JSON
    const data = xlsx.utils.sheet_to_json(sheet);
    console.log(data);

    try {
        for (let item of data) {
            let image_url = item.image_url;
            let roomType = item.roomType;

            console.log(image_url + " " + roomType);
            await RoomType.create({
                // roomType: roomType,         
                // image_url: "image/" + filename,
                roomType, image_url
            });
        }
        return response.status(200).json({ message: 'room Type added successfully...' });

    } catch (err) {
        console.log(err);
        return response.status(501).json({ error: "Internal server error" });
    }
}
//==================================================================================================================

export const roomType = async (request, response, next) => {
    const { filename } = request.file;
    RoomType.create({
        roomType: request.body.roomType,
        image_url: "image/" + filename,
    })
        .then(result => {
            return response.status(200).json({ message: 'room Type added successfully...', data: result.dataValues });
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ error: 'Internal server Problem...' })
        })
}


//all designs of all roomType in 1 excel
// export const addDesignImages = async (request, response, next) => {
//     // const workbook = xlsx.readFile('pujaMandirImages-129.xlsx');
//     // const workbook = xlsx.readFile('LivingRoom-Images-129.xlsx');
//     // const workbook = xlsx.readFile('FOYER_images-338.xlsx');
//     // const workbook = xlsx.readFile('Outdoors_&_BalconyImg139.xlsx');
//     // const workbook = xlsx.readFile('TV-UNIT-174.xlsx');
//     // const workbook = xlsx.readFile('Kitchen-155.xlsx');
//     // const workbook = xlsx.readFile('Bedroom-139.xlsx');
//     // const workbook = xlsx.readFile('Wardrobe142.xlsx');
//     // const workbook = xlsx.readFile('BATHROOM-128.xlsx');
//     // const workbook = xlsx.readFile('KIDS BEDROOM -131.xlsx');
//     const workbook = xlsx.readFile('Dining-Area-201.xlsx');


//     const sheet_name = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheet_name];
//     console.log(request.body);

//     // convert the sheet to JSON
//     const data = xlsx.utils.sheet_to_json(sheet);
//     console.log(data);

//     try {
//         for (let item of data) {
//             let design_id = item.design_id;
//             let image_url = item.image_url;
//             let description = item.description;

//             console.log(design_id + " " + image_url + " " + description);
//             await Design_image.create({
//                 design_id, image_url, description
//             });
//         }
//         return response.status(200).json({ message: 'Dining room images added successfully' });
//     } catch (err) {
//         console.log(err);
//         return response.status(501).json({ error: "Internal server error" });
//     }
// }
//====================================================================================================================
export const addDesignImages = async (request, response, next) => {
    try {
        if (!request.file) {
            return response.status(400).json({ error: 'No file uploaded' });
        }
        if (
            request.file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
            request.file.mimetype !== 'application/vnd.ms-excel'
        ) {
            return response.status(400).json({ error: 'Only Excel files (.xlsx, .xls) are allowed' });
        }

        const workbook = xlsx.readFile(request.file.path);
        const sheet_name = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheet_name];
        // convert the sheet to JSON
        const data = xlsx.utils.sheet_to_json(sheet);

        for (let item of data) {
            let design_id = item.design_id;
            let image_url = item.image_url;
            let description = item.description;

            console.log(`Processing designs: design_id ID ${design_id}`);

            try {
                const existingDesign = await Design.findOne({
                    where: {
                        design_id: design_id
                    }
                });

                if (!existingDesign) {
                    return response.status(404).json({ error: 'Corresponding design not found' });
                }

                const result = await Design_image.create({
                    design_id: design_id,
                    image_url: image_url,
                    description: description
                });

                console.log("Design images uploaded successfully...", { data: result });
            } catch (error) {
                console.log(error);
                return response.status(500).json({ error: 'Internal server Problem..' });
            }
        }
        return response.status(200).json({ message: 'Design images uploaded successfully...' });
    } catch (error) {
        console.log("Error in Design design_images: " + error);
        return response.status(500).json({ error: 'Internal server problem...' });
    }
}

//====================================================================================================================

// export const addDesignVideo = async (request, response, next) => { //excel
//     if (!request.file) {
//         console.log(request.file)
//         return response.status(400).json({ error: 'No file uploaded' });
//       }
//       if (
//         request.file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && // .xlsx
//         request.file.mimetype !== 'application/vnd.ms-excel' // .xls
//       ) {
//         return response.status(400).json({ error: 'Only Excel files (.xlsx, .xls) are allowed' });
//       }
//     // const workbook = xlsx.readFile('1PROFE-ALL-DESIGN- videos.xlsx');

//     const workbook = xlsx.readFile(request.file.path);


//     const sheet_name = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheet_name];
//     console.log(request.body);

//     // convert the sheet to JSON
//     const data = xlsx.utils.sheet_to_json(sheet);
//     console.log(data);

//     try {
//         for (let item of data) {
//             let professional_id = item.professional_id;
//             let roomType_id = item.roomType_id;
//             let video = item.video;
//             let title = item.title

//             console.log(professional_id + " " + roomType_id + " " + video + " " + title);
//             await Design.create({
//                 professional_id, roomType_id, video, title
//             });
//         }
//         return response.status(200).json({ message: 'PROFESSIONAL  Design VIDEO  added successfully  Product Added...' });
//     } catch (err) {
//         console.log(err);
//         return response.status(501).json({ error: "Internal server error" });
//     }
// }
//======================================================================================================================

export const addDesignVideo = async (request, response, next) => { // FILTER DUPLICACY CODE
    try {
        if (!request.file) {
            return response.status(400).json({ error: 'No file uploaded' });
        }
        if (
            request.file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
            request.file.mimetype !== 'application/vnd.ms-excel'
        ) {
            return response.status(400).json({ error: 'Only Excel files (.xlsx, .xls) are allowed' });
        }

        const workbook = xlsx.readFile(request.file.path);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        for (let item of data) {
            let professional_id = item.professional_id;
            let roomType_id = item.roomType_id;
            let video = item.video;
            let title = item.title;

            console.log(`Processing video: Professional ID ${professional_id}, RoomType ID ${roomType_id}`);


            const room = await RoomType.findOne({
                where: {
                    roomType_id: roomType_id,
                },
            });

            if (room) {
                const roomType_id = room.roomType_id;
                const existingVideo = await Design.findOne({
                    where: {
                        roomType_id: roomType_id,
                        professional_id: professional_id,
                    },
                });

                if (existingVideo) {
                    console.log('Updating existing video');

                    await existingVideo.update({
                        title: title,
                        video: video,
                    });
                    // return response.status(200).json({ message: 'Video updated successfully', data: existingVideo });
                    console.log('Video updated successfully', { data: existingVideo });

                } else {
                    console.log('Creating new video');
                    const newVideo = await Design.create({
                        professional_id: professional_id,
                        roomType_id: roomType_id,
                        title: title,
                        video: video,
                    });
                    // return response.status(200).json({ message: 'Professional design video uploaded successfully', data: newVideo });
                    console.log('New video created successfully', { data: newVideo });
                }
            } else {
                return response.status(404).json({ error: 'RoomType not found' });
            }
        }
        return response.status(200).json({ message: 'Videos processed successfully' });

    } catch (error) {
        console.log("Error processing design video: " + error);
        return response.status(500).json({ error: 'Internal server problem...' });
    }
};

//====================================================================================================================
// Design table me multiple roomType_id ho skti hai 1 professional ke pas 12 roomType_id ho skti hai agar us professional ne us roomType ke liye video title ke sath upload kiya hai  to uske naye vale video se use update kar dena kyoki roomType_id aur professonal_id user ke input se match karti hai it means uska video avail hai aur vo roomType_id jo input professional_id ke corresponding nhi hai to uska video title ke sath new add ho jaiga


//fine work
export const video = (request, response, next) => {
    const { professional_id, roomType, title, video } = request.body;

    RoomType.findOne({
        where: {
            roomType: roomType
        }
    })
        .then(room => {
            if (room) {
                const roomType_id = room.roomType_id;
                Design.findOne({
                    where: {
                        roomType_id: roomType_id,
                        professional_id: professional_id,
                    }
                })
                    .then(existingVideo => {
                        if (existingVideo) {
                            existingVideo.update({
                                title: title,
                                video: video
                            })
                                .then(updatedVideo => {
                                    return response.status(200).json({ message: 'Video updated successfully', data: updatedVideo });
                                })
                                .catch(err => {
                                    console.log("Error updating video: " + err);
                                    return response.status(500).json({ error: 'Internal server problem...' });
                                });
                        } else {
                            Design.create({
                                professional_id: professional_id,
                                roomType_id: roomType_id,
                                title: title,
                                video: video
                            })
                                .then(newVideo => {
                                    return response.status(200).json({ message: 'Video uploaded successfully', data: newVideo });
                                })
                                .catch(err => {
                                    console.log("Error creating new video: " + err);
                                    return response.status(500).json({ error: 'Internal server problem...' });
                                });
                        }
                    })
                    .catch(err => {
                        console.log("Error finding existing video: " + err);
                        return response.status(500).json({ error: 'Internal server problem...' });
                    });
            } else {
                return response.status(404).json({ error: 'RoomType not found' });
            }
        })
        .catch(err => {
            console.log("Error finding roomType: " + err);
            return response.status(500).json({ error: 'Internal server problem...' });
        });
};


//===================================================================================================================
// export const design_images = (request, response, next) => {
//     const { filename } = request.file;
//     Design_image.create({
//         design_id: request.body.design_id,
//         image_url: "image/" + filename,
//         description: request.body.description
//     })
//         .then(result => {
//             return response.status(200).json({ message: 'Design images uploded successfully...' })
//         }).catch(err => {
//             console.log("Error inside design_images ", err);
//             return response.status(500).json({ error: 'Internal server Problem..' })
//         })
// } with files

//=================================================================================================
export const design_images = (request, response, next) => {
    const { design_id, image_url, description } = request.body;
    console.log("Received Design ID: " + design_id);

    Design.findOne({
        where: {
            design_id: design_id
        }
    })
        .then(existingDesign => {
            if (existingDesign) {
                Design_image.create({
                    design_id: design_id,
                    image_url: image_url,
                    description: description
                })
                    .then(result => {
                        return response.status(200).json({ message: 'Design images uploaded successfully...', data: result });
                    })
                    .catch(err => {
                        console.log(err);
                        return response.status(500).json({ error: 'Internal server Problem..' });
                    });
            } else {
                return response.status(404).json({ error: 'Corresponding design not found' });
            }
        })
        .catch(err => {
            console.log("Error finding corresponding design: ", err);
            return response.status(500).json({ error: 'Internal server Problem..' });
        });
}
//=================================================================================================

export const viewalldesign = async (request, response, next) => {
    try {
        const designs = await Design.findAll({
            include: [
                {
                    model: Design_image,
                    attributes: ['designImg_id', 'image_url', 'description']
                }, {
                    model: RoomType,
                    attributes: ['roomType_id', 'roomType']
                }, {
                    model: Professional,
                    attributes: ['professional_id', 'professional_name']
                }
            ]
        });
        return response.status(200).json({ message: "List of all Designs : ", data: designs })
    } catch (err) {
        console.log(err)
        return response.status(500).json({ message: "Internal server Problem" })

    }
}
//=================================================================================================================

export const viewDesignById = async (request, response, next) => {
    const { design_id } = request.query;
    console.log("Design ID:", design_id);

    try {
        if (!design_id) {
            return response.status(400).json({ message: "Design ID is required" });
        }
        const design = await Design.findOne({
            where: { design_id },
            include: [
                {
                    model: Design_image,
                    attributes: ['designImg_id', 'image_url', 'description']
                },
                {
                    model: RoomType,
                    attributes: ['roomType']
                },
                {
                    model: Professional,
                    attributes: ['professional_id', 'professional_name', 'city', 'address', 'pincode', 'gender', 'contact_no', 'is_created', 'is_active', 'is_update', 'email', 'profileImg_URL']
                }
            ]
        });

        if (!design) {
            return response.status(404).json({ message: "Design not found" });
        }
        const datawewant = {
            design_id: design.design_id,
            video: design.video,
            roomType: design.roomType.roomType,
            professional: {
                professional_id: design.professional.professional_id,
                professional_name: design.professional.professional_name,
                city: design.professional.city,
                address: design.professional.address,
                pincode: design.professional.pincode,
                gender: design.professional.gender,
                contact_no: design.professional.contact_no,
                is_created: design.professional.is_created,
                is_active: design.professional.is_active,
                is_update: design.professional.is_update,
                email: design.professional.email,
                profileImg_URL: design.professional.profileImg_URL
            },
            design_images: design.design_images.map(image => ({
                designImg_id: image.designImg_id,
                image_url: image.image_url,
                description: image.description
            }))
        };

        return response.status(200).json({ message: "Design found", data: datawewant });
    } catch (err) {
        console.error(err);
        return response.status(500).json({ message: "Internal server error" });
    }
};
//===============================================================================================================
export const getDesignByRoomType = async (request, response, next) => {
    try {
        const roomType = request.body.roomType
        console.log("roomType " + roomType)

        if (!roomType) {
            return response.status(400).json({ error: "Room type is required in the request." });
        }
        let findRoomType = await RoomType.findOne({ where: { roomType: roomType } })

        if (!findRoomType) {
            return response.status(404).json({ message: "Room type not found." });
        }

        const designs = await Design.findAll({
            where: { roomType_id: findRoomType.roomType_id },

            include: [
                {
                    model: Design_image,
                    attributes: ['image_url', 'description']
                },
                {
                    model: RoomType,
                    attributes: ['roomType'],
                }
            ]
        });


        if (designs.length === 0) {
            return response.status(404).json({ message: "No designs found for the specified room type." });
        }

        const responseData = designs.map(design => ({
            image_url: design.Design_mages && design.Design_images.length > 0 ? design.Design_images[0].image_url : null,
            roomType: design.RoomType ? design.RoomType.roomType : null,
            description: design.Design_images && design.Design_images.length > 0 ? design.Design_images[0].description : null
        }));

        return response.status(200).json({ data: responseData });

    } catch (error) {
        console.log(error)
        return response.status(500).json({ error: "Internal server error" });

    }
}
//===============================================================================================================

export const viewAllRoomType = async (request, response, next) => {

    RoomType.findAll({
    })
        .then(result => {
            if (result.length !== 0) {
                return response.status(200).json({ data: result });
            }
            return response.status(404).json("Sorry, we couldn't find the information");
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ error: "Internal server Problem..." });
        });
};
export const design_feedback = (request, response, next) => {
    DesignFeedback.create({
        design_id: request.body.design_id,
        user_id: request.body.user_id,
        feedback: request.body.feedback

    }).then(result => {
        return response.status(200).json({ message: 'Design Feedback added successfully...', data: result.dataValues });
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: 'Internal server Problem...' })
    })
};
//=================================================================================================================

export const favourite_design = (request, response, next) => {
    const { user_id, designImg_id } = request.body;
    DesignFav.findOne({where:{user_id ,designImg_id}})
    .then(existFav =>{
        if(existFav){
            return response.status(400).json({ error: 'Design already added to favorites.' });
        }
        DesignFav.create({
        user_id: user_id,
        designImg_id: designImg_id,
    }).then(result => {
        return response.status(200).json({ message: 'Design Favourite added successfully...', data: result.dataValues });
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: 'Internal server Problem...' })
    });
}).catch(err =>{
    console.log(err);
    return response.status(500).json({error:'Internal server Problem.'})
})

}

//  export const designDetails = (request, response, next) => {
//     Design.findAll({
//       include: [
//         {
//           model: Design_image,
//           attributes: ['image_url', 'description'],
//         },
//         {
//           model: RoomType,
//           attributes: ['roomType'],
//           where: { roomType_id: 2 },
//         },
//       ],
//       where: { professional_id: 1 },
//     })
//       .then((designs) => {
//         console.log('Designs:', designs); // Log the retrieved designs

//         // Extract necessary data and format as JSON
//         // const formattedData = designs.map((design) => ({
//         //     image_url: design.design_images.length > 0 ? design.design_images[0].image_url : null,
//         //     description: design.design_images.length > 0 ? design.design_images[0].description : null,
//         //     roomType: design.roomType ? design.roomType.roomType : null,
//         //   }));
//         const formattedData = designs.map((design) => ({
//             image_urls: design.design_images.map((image) => image.image_url),
//             descriptions: design.design_images.map((image) => image.description),
//             roomType: design.roomType ? design.roomType.roomType : null,
//           }));


//         console.log('Formatted Data:', formattedData); // Log the formatted data

//         // Send the formatted data as a response
//         response.status(200).json(formattedData);
//       })
//       .catch((error) => {
//         // Handle any errors
//         console.error('Error fetching data:', error);
//         response.status(500).send('Error fetching data');
//       });
//   };

export const designDetails = (request, response, next) => {
    const { professional_id, roomType_id } = request.body;
    console.log(professional_id + " " + roomType_id)
    Design.findAll({
        include: [
            {
                model: Design_image,
                attributes: ['image_url', 'description', 'designImg_id'],
            },
            {
                model: RoomType,
                attributes: ['roomType'],
                where: { roomType_id }, // Use roomType_id from the request body
            },
        ],
        where: { professional_id }, // Use professional_id from the request body
    })
        .then((designs) => {
            console.log('Designs:', designs);

            const formattedData = designs.map((design) => ({
                image_urls: design.design_images.map((image) => image.image_url),
                descriptions: design.design_images.map((image) => image.description),
                descriptions: design.design_images.map((image) => image.description),
                designImg_id: design.design_images.map((image) => image.designImg_id),
                roomType: design.roomType ? design.roomType.roomType : null,
            }));

            console.log('Formatted Data:', formattedData); // Log the formatted data

            // Send the formatted data as a response
            response.status(200).json(formattedData);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            response.status(500).send('Error fetching data');
        });
};



// export const allFavouriteList = async (req, res, next) => {
//     const user_id = parseInt(req.query.user_id); // Parse the user_id to ensure it's a number

//     if (isNaN(user_id)) {
//         console.error('Invalid user_id:', req.query.user_id);
//         return res.status(400).json({ error: 'Invalid user_id' });
//     }

//     DesignFav.findAll({
//         where: { user_id },
//         include: [
//             {
//                 model: Design_image,
//                 attributes: ['designImg_id', 'image_url', 'description'],
//             },
//             {
//                 model: User,
//                 attributes: ['user_id', 'name', 'username', 'contact_no'],
//             },
//         ],
//     })
//         .then((result) => {
//             res.json(result);
//         })
//         .catch((err) => {
//             // Handle any errors
//             console.error('Error fetching data:', err);
//             res.status(500).json({ error: 'Error fetching data' });
//         });
// };
// cotrrect hai upper vali b
export const allFavouriteList = async (req, res, next) => {
    const user_id = parseInt(req.query.user_id);

    if (isNaN(user_id)) {
        console.error('Invalid user_id:', req.query.user_id);
        return res.status(400).json({ error: 'Invalid user_id' });
    }

    DesignFav.findAll({
        where: { user_id },
        include: [
            {
                model: Design_image,
                attributes: ['designImg_id', 'image_url', 'description'],
            },
            {
                model: User,
                attributes: ['user_id', 'name', 'username', 'contact_no'],
            },
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        distinct: true,
    })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            // Handle any errors
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Error fetching data' });
        });
}

/*SELECT rt.roomType, di.image_url, di.description
FROM roomTypes rt
JOIN designs d ON rt.roomType_id = d.roomType_id
JOIN design_images di ON d.design_id = di.design_id
WHERE rt.roomType = 'Bathrooms';
 */



// export const video = async (request, response, next) => {
//     let proExistprofe = await Professional.findOne({ where: { professional_id: request.body.professional_id }, raw: true })

//     console.log("Professional exist in pro table " + proExistprofe.professional_id)

//     //  let pro_id = request.body.professional_id
//     //  console.log(" pro_id ........"+pro_id )

//     let currentPro = await Design.findOne({ where: { professional_id: request.body.professional_id }, raw: true })

//     // console.log("currentPro in Design "+currentPro.professional_id)
//     // let currentPro_id = currentPro.professional_id ;

//     let roomType = await Design.findOne({ where: { room_id: request.body.room_id } })

//     if (currentPro && roomType) {  // design both exist
//         // console.log("currentroomId in Design "+roomType.room_id)

//         let currentPro_id = currentPro.professional_id;
//         let currentRoom_id = roomType.room_id;


//         if ((currentPro_id == request.body.professional_id) && (currentRoom_id == request.body.room_id)) {
//             // console.log("Professional id "+request.body.professional_id+ " and room id "+request.body.room_id +"    MATCH" )
//             console.log("You can upload only 1 video of the roomType")
//         } else {
//             // console.log("Professional id "+request.body.professional_id+ " and room id "+request.body.room_id +"...........NOT MATCH" )
//             let actualProfessional = proExistprofe.professional_id
//             const { filename } = request.file;

//             Design.create({
//                 professional_id: actualProfessional,
//                 room_id: request.body.room_id,
//                 video: "video/" + filename
//             })
//                 .then(result => {
//                     return response.status(200).json({ message: 'video uploded successfully', data: result.dataValues })
//                 }).catch(err => {

//                     console.log("Error inside catch " + err)
//                     return response.status(500).json({ error: 'Internal server Problem...' });
//                 })
//         }
//     } else {
//         console.log("Internal server Error")
//     }

// }

// export const getCategoryone = (request, response, next) => {
//     Design_image.findAll({
//         where: { design_id: request.body.design_id },
//         include: [{
//             model: Design,
//             include: [{
//                 model: Professional,
//                 // attributes: ["design_id", "roomType_id"]
//             }],
//         }],
//         raw: true,
//         limit: null
//     })

//         .then(result => {
//             console.log(result);
//             return response.status(200).json({ data: result })
//         }).catch(err => {
//             console.log(err);
//         })
// } 2pro ki upload design not shoW NOT WORKING JIYA CODEJ


export const getCategoryone = async(req, res, next) => {
    console.log(req.query)
    const { roomType_id } = req.query;

  try {
    const roomTypeWithDesigns = await RoomType.findOne({
      where: { roomType_id },
      include: {
        model: Design,
        include: [
          {
            model: Professional
          },
          {
            model: Design_image
          }
        ]
      }
    });

    if (!roomTypeWithDesigns) {
      return res.status(404).json({ error: 'RoomType not found' });
    }

    res.json(roomTypeWithDesigns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the data' });
  }
};



export const VideosByPro_id = (request, response, next) => {
    const { professional_id } = request.query;
    const pro_id = Design.findOne({ where: { professional_id } })
    if (!pro_id) {
        console.log("Videos are not available");
        return response.status(404).json({ message: "Videos are not available" });
    }
    Design.findAll({ where: { professional_id } })
        .then(result => {
            return response.status(200).json({ message: "All Professional videos fetched successfully", data: result });
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Internal server error" });

        })
}
//DELETE FROM products;
//SET FOREIGN_KEY_CHECKS = 0;
// TRUNCATE TABLE products;
//SET FOREIGN_KEY_CHECKS = 1;






