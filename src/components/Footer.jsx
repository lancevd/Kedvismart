import {
  TbBrandFacebookFilled,
  TbBrandGithub,
  TbBrandInstagram,
  TbBrandTwitterFilled,
} from "react-icons/tb";
import Newsletter from "./Newsletter";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#f0f0f0] py-4">
      <Newsletter />
      <div className="space"></div>
      <div className="contain flex flex-col gap-4 md:gap-12 md:flex-row">
        <div className="w-full md:w-1/4">
          <h1 className="font-bold">KedvisMart</h1>
          <p>
            We have clothes that suits your style and which you’re proud to
            wear. From women to men.
          </p>
          <div className="flex gap-2">
            <Link href={"#"} className="border bg-white p-2 rounded-full">
              <TbBrandTwitterFilled />
            </Link>
            <Link href={"#"} className="border bg-white p-2 rounded-full">
              <TbBrandFacebookFilled />
            </Link>
            <Link href={"#"} className="border bg-white p-2 rounded-full">
              <TbBrandInstagram />
            </Link>
            <Link href={"#"} className="border bg-white p-2 rounded-full">
              <TbBrandGithub />
            </Link>
          </div>
        </div>
        <div className="w-full md:w-3/4 grid gap-6 grid-cols-2 lg:grid-cols-4">
          <div className="">
            <p className="font-medium uppercase">Company</p>
            <br />
            <menu className="flex gap-2 flex-col">
              <Link href={"#"}>About Us</Link>
              <Link href={"#"}>Features</Link>
              <Link href={"#"}>Works</Link>
              <Link href={"#"}>Career</Link>
            </menu>
          </div>

          <div className="">
            <p className="font-medium uppercase">help</p>
            <br />
            <menu className="flex gap-2 flex-col">
              <Link href={"#"}>Customer Support</Link>
              <Link href={"#"}>Delivery Details</Link>
              <Link href={"#"}>Terms & Conditions</Link>
              <Link href={"#"}>Privacy Policy</Link>
            </menu>
          </div>
          <div className="">
            <p className="font-medium uppercase">faq</p>
            <br />
            <menu className="flex gap-2 flex-col">
              <Link href={"#"}>Account</Link>
              <Link href={"#"}>Manaage Deliveries</Link>
              <Link href={"#"}>Orders </Link>
              <Link href={"#"}>Payments</Link>
            </menu>
          </div>
          <div className="">
            <p className="font-medium uppercase">Resources</p>
            <br />
            <menu className="flex gap-2 flex-col">
              <Link href={"#"}>Free eBooks</Link>
              <Link href={"#"}>Development Tutorials</Link>
              <Link href={"#"}>How to</Link>
              <Link href={"#"}>Youtube Playlist</Link>
            </menu>
          </div>
        </div>
      </div>
      <br />
      <div className="md:hidden">
        <hr />
      </div>
      <div className="contain flex flex-col lg:flex-row gap-3 md:justify-between items-center">
        <p>Kedvis Mart 2024 &copy;. All rights reserved.</p>
        <div className="flex gap-2">
          <img src="/images/visa.png" alt="" />
          <img src="/images/mastercard.png" alt="" />
          <img src="/images/paypal.png" alt="" />
          <img src="/images/apple.png" alt="" />
          <img src="/images/google.png" alt="" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
