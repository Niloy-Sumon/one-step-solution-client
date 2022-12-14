import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';

const ServicesDetails = () => {
    const { productId } = useParams()
    const [singleProduct, setSingleProduct] = useState([])
    const [user] = useAuthState(auth)
    useEffect(() => {
        fetch(`http://localhost:5000/order/${productId}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setSingleProduct(data)
            })
    }, [productId])
    const [info, setInfo] = useState({})
    const handleBlur = e => {
        const newInfo = { ...info }
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const order = {
            email: user.email,
            name: user.name,
            service: singleProduct.name,
            serviceId: productId,
            address: event.target.address.value,
            phone: event.target.phone.value,
            price: singleProduct.price
        }
        const url = `http://localhost:5000/addProduct`;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                event.target.reset();
                toast('Your order is booked!!!');
            });
        }
        return (
            <div>
                <div>
                    <p>service destails : {productId}</p>
                    <p>{singleProduct._id}</p>
                    <p>Name: {singleProduct.Name}</p>
                    {/* <p>Phone: {singleProduct.phone}</p> */}
                </div>
                <div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="Name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onBlur={handleBlur} type="text" name='name' defaultValue={user.displayName} placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control onBlur={handleBlur} type="email" defaultValue={user.email} readOnly name='email' placeholder="Enter Email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control onBlur={handleBlur} type="text" name='address' placeholder="Enter Address" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control onBlur={handleBlur} type="number" name='phone' placeholder="Enter Phone Number" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="quantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control onBlur={handleBlur} type="number" name='quantity' placeholder="minimum order quantity 5" />
                        </Form.Group>
                        <h4>Price: {singleProduct.price} </h4>
                        <Button variant="primary" type="submit">
                            Checkout Product
                        </Button>
                    </Form>
                </div>
            </div>
        );
    };

    export default ServicesDetails;