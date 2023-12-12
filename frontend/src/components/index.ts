import Login from "./auth/Login";
import Register from "./auth/Register";

import Loader from "./shared/Loader";
import ProductCard from "./shared/ProductCard";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

import PaymentModal from "./modals/PaymentModal";
import UserDropDown from "./modals/UserDropDown";
import VendorModal from "./modals/VendorModal";

import Cartegories from "./widget/Cartegories";
import  Products from "./widget/Products";
import Cart from "./widget/Cart";
import Vendor from "./widget/Vendor";
import OrderTable from "./widget/OrderTable";
import ProductForm from "./widget/ProductForm";
import ProductTable from "./widget/ProductTable";

import DesktopCart from "./responsive/DesktopCart";
import MobileCart from "./responsive/MobileCart";


export {
    Login, Register, Loader, Navbar, Cartegories, Products,
    ProductCard, Footer, Cart, PaymentModal, DesktopCart, MobileCart,
    UserDropDown, VendorModal, Vendor, OrderTable, ProductForm, ProductTable
}