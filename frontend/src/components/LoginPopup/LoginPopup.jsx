import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({ setShowLogin }) => {
    const { setToken, url, loadCartData } = useContext(StoreContext)
    const [currState, setCurrState] = useState("Sign Up")
    const [loginMethod, setLoginMethod] = useState("email") // 'email' or 'phone'
    
    // Email login state
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    // Phone login state
    const [phoneData, setPhoneData] = useState({
        phone: "",
        countryCode: "+1",
        name: "" // Only for sign up
    })
    const [otp, setOtp] = useState(["", "", "", ""])
    const [isOtpSent, setIsOtpSent] = useState(false)

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const onPhoneChange = (e) => {
        const { name, value } = e.target
        setPhoneData(prev => ({ ...prev, [name]: value }))
    }

    const handleOtpChange = (index, value) => {
        if (isNaN(value)) return
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)
        
        // Auto focus to next input
        if (value && index < 3) {
            document.getElementById(`otp-input-${index + 1}`).focus()
        }
    }

    const sendOtp = async () => {
        try {
            const response = await axios.post(`${url}/api/user/send-otp`, {
                phone: `${phoneData.countryCode}${phoneData.phone}`
            })
            if (response.data.success) {
                setIsOtpSent(true)
                toast.success("OTP sent successfully!")
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("Failed to send OTP")
        }
    }

    const verifyOtp = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${url}/api/user/verify-otp`, {
                phone: `${phoneData.countryCode}${phoneData.phone}`,
                otp: otp.join(""),
                name: currState === "Sign Up" ? phoneData.name : undefined
            })
            if (response.data.success) {
                setToken(response.data.token)
                localStorage.setItem("token", response.data.token)
                loadCartData({ token: response.data.token })
                setShowLogin(false)
                toast.success("Login successful!")
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("OTP verification failed")
        }
    }

    const onLogin = async (e) => {
        e.preventDefault()
        if (loginMethod === "phone") {
            if (!isOtpSent) {
                await sendOtp()
                return
            }
            await verifyOtp(e)
            return
        }

        // Existing email login logic
        let new_url = url
        if (currState === "Login") {
            new_url += "/api/user/login"
        } else {
            new_url += "/api/user/register"
        }
        const response = await axios.post(new_url, data)
        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            loadCartData({ token: response.data.token })
            setShowLogin(false)
        } else {
            toast.error(response.data.message)
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>

                <div className="login-method-toggle">
                    <button 
                        type="button"
                        className={loginMethod === "email" ? "active" : ""}
                        onClick={() => setLoginMethod("email")}
                    >
                        Email
                    </button>
                    <button 
                        type="button"
                        className={loginMethod === "phone" ? "active" : ""}
                        onClick={() => setLoginMethod("phone")}
                    >
                        Phone
                    </button>
                </div>

                {loginMethod === "email" ? (
                    <>
                        <div className="login-popup-inputs">
                            {currState === "Sign Up" && (
                                <input 
                                    name="name"
                                    onChange={onChangeHandler}
                                    value={data.name}
                                    type="text"
                                    placeholder='Your name'
                                    required 
                                />
                            )}
                            <input 
                                name="email"
                                onChange={onChangeHandler}
                                value={data.email}
                                type="email"
                                placeholder='Your email'
                                required
                            />
                            <input 
                                name="password"
                                onChange={onChangeHandler}
                                value={data.password}
                                type="password"
                                placeholder='Password'
                                required
                            />
                        </div>
                        <button type="submit">
                            {currState === "Login" ? "Login" : "Create account"}
                        </button>
                    </>
                ) : (
                    <>
                        <div className="login-popup-inputs">
                            {currState === "Sign Up" && (
                                <input 
                                    name="name"
                                    onChange={onPhoneChange}
                                    value={phoneData.name}
                                    type="text"
                                    placeholder='Your name'
                                    required 
                                />
                            )}
                            <div className="phone-input-container">
                                <select 
                                    name="countryCode"
                                    value={phoneData.countryCode}
                                    onChange={onPhoneChange}
                                >
                                    
                                    <option value="+91">+91 (IN)</option>
                                    
                                </select>
                                <input 
                                    name="phone"
                                    onChange={onPhoneChange}
                                    value={phoneData.phone}
                                    type="tel"
                                    placeholder='Phone number'
                                    required
                                />
                            </div>

                            {isOtpSent && (
                                <div className="otp-container">
                                    <p>Enter OTP sent to your phone</p>
                                    <div className="otp-inputs">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                id={`otp-input-${index}`}
                                                type="text"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                required
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <button type="submit">
                            {isOtpSent ? "Verify OTP" : "Send OTP"}
                        </button>
                    </>
                )}

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

                {currState === "Login" ? (
                    <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
                )}
            </form>
        </div>
    )
}

export default LoginPopup
