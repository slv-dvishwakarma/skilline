"use client";
import { SVGIcon } from "@/components/Icons";
import { LoginPopup } from "@/components/Popup/LoginPopup";
import { SignUpPopup } from "@/components/Popup/SignUpPopup";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
interface InputItem {
  name: string;
  placeholder: string;
  label: string;
  icon: string;
}

interface passwordItem {
  eye: string;
  eye_off: string;
}

interface checkboxItem {
  name: string;
  label: string;
}

interface LoginFormItem {
  email: InputItem;
  password: InputItem;
  button: string;
  password_protection: passwordItem;
  checkbox: checkboxItem;
}

interface SignupItem {
  email: InputItem;
  password: InputItem;
  button: string;
  password_protection: passwordItem;
  username: InputItem;
}

interface ContentItem {
  title_1: string;
  title_2: string;
  login: string;
  signup: string;
  dark: string;
  light: string;
}

interface StoriesItem {
  icon: string;
  title: string;
  url: string;
}

interface MenuItem {
  icon: string;
  title: string;
  label: string;
  url: string;
}

interface MainMenuItem {
  title: string;
  url?: string;
  max_menu?: MenuItem[];
  stories?: StoriesItem[];
}

interface HeaderProps {
  mainmenu: MainMenuItem[];
  content: ContentItem;
  login_form: LoginFormItem;
  signup_form: SignupItem;
}

export const HeaderTemplate: React.FC<HeaderProps> = ({
  mainmenu,
  content,
  login_form,
  signup_form,
}) => {
  const pathName = usePathname();
  const [admin, setAdmin] = useState(false);
  const { isAdmin } = useSelector((state: any) => state.auth);
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    console.log(admin);
  }, [isAdmin]);
  const handlemegamenu = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleburgermenuclick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogin = () => {
    setLogin(true);
  };

  const handleLoginClose = () => {
    setLogin(false);
  };

  const handleSignup = () => {
    setSignup(true);
  };

  const handlesignupClose = () => {
    setSignup(false);
  };

  useEffect(() => {
    if (login) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [login]);

  useEffect(() => {
    if (signup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [signup]);

  useEffect(() => {
    const isUrlActive = (url: string) => pathName === url;
    const isMenuActive = mainmenu.some((menu) => {
      if (menu.url && isUrlActive(menu.url)) {
        return true;
      }
      if (menu.max_menu) {
        return menu.max_menu.some((item) => isUrlActive(item.url));
      }

      return false;
    });
    if (isMenuActive) {
      setIsOpen(false);
      setIsDropdownOpen(false);
    }
  }, [pathName, mainmenu]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      if (!open && window.scrollY > 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open]);

  return (
    <>
      <nav
        className={`dark:border-gray-700 ${
          isSticky
            ? "shadow-[0_13px_35px_-12px_rgba(35,35,35,0.15)] fixed w-full z-[99] top-0 animate-animateSlideInDown bg-primary px-[4%] md:px-[3%] lg:px-[3%] xl:px-[5%] left-0"
            : ""
        }`}
        style={
          isSticky
            ? {
                animationDuration: ".5s",
                animationFillMode: "both",
                animationName: "slideInDown",
                transform: "translate3d(0, -100%, 0)",
              }
            : undefined
        }
      >
        <div className="max-w-screen-xl flex items-center justify-between mx-auto xl:p-4 lg:p-3 md:p-4 p-4">
          <Link
            href="/"
            className="text-dark_text block xl:text-3xl lg:text-xl md:text-3xl text-3xl font-bold relative no-underline z-[1] after:bg-tertiary after:rounded after:content-[''] after:block xl:after:h-[40px] lg:after:h-[30px] md:after:h-[30px] after:h-[40px] after:left-[-10%] after:absolute after:rotate-45 xl:after:w-[40px] lg:after:w-[30px] md:after:w-[30px] after:w-[40px] after:z-[-1] after:top-0 leading-[46px] xl:order-1 lg:order-1 md:order-1 order-1"
          >
            {" "}
            Skilline
          </Link>
          <div className="xl:order-2 lg:order-2 md:order-2 order-3 flex items-center gap-3 lg:hidden">
            <button
              type="button"
              className="xl:hidden lg:hidden md:hidden bg-white shadow-[1px_13px_10px_-2px_rgba(34,60,80,0.13)] text-black cursor-pointer text-[15px] rounded-[80px] w-[30px] h-[30px] flex justify-center items-center"
              onClick={toggleDarkMode}
            >
              {!isDarkMode ? (
                <SVGIcon name={content.light} />
              ) : (
                <SVGIcon name={content.dark} />
              )}
            </button>
            {!isOpen ? (
              <button
                data-collapse-toggle="navbar-dropdown"
                type="button"
                onClick={handleburgermenuclick}
                aria-controls="navbar-dropdown"
                aria-expanded="false"
              >
                <SVGIcon
                  className="xl:hidden lg:hidden md:hidden shadow-[1px_13px_10px_-2px_rgba(34,60,80,0.13)] bg-white inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-secondary rounded-lg text-xl"
                  name="HamburgerMenu"
                />
              </button>
            ) : null}
          </div>
          <div className="order-3 hidden xl:block lg:block md:block hidden xl:gap-5 lg:gap-5 md:gap-10  xl:flex lg:flex md:flex items-center justify-between">
            <button
              type="button"
              className="bg-white shadow-[1px_13px_10px_-2px_rgba(34,60,80,0.13)] text-black cursor-pointer text-[15px] rounded-[80px] px-[30px] py-2"
              onClick={handleLogin}
            >
              {content.login}
            </button>
            <button
              type="button"
              className="bg-secondary  text-white text-[15px] rounded-[80px] px-[30px] py-2"
              onClick={handleSignup}
            >
              {content.signup}
            </button>
            <button
              type="button"
              className="bg-white shadow-[1px_13px_10px_-2px_rgba(34,60,80,0.13)] text-black cursor-pointer text-[15px] rounded-[80px] w-[30px] h-[30px] flex justify-center items-center"
              onClick={toggleDarkMode}
            >
              {!isDarkMode ? (
                <SVGIcon name={content.light} />
              ) : (
                <SVGIcon name={content.dark} />
              )}
            </button>
            {!isOpen ? (
              <button
                data-collapse-toggle="navbar-dropdown"
                type="button"
                onClick={handleburgermenuclick}
                aria-controls="navbar-dropdown"
                aria-expanded="false"
              >
                <SVGIcon
                  className="xl:hidden lg:hidden md:block shadow-[1px_13px_10px_-2px_rgba(34,60,80,0.13)] bg-white inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-secondary rounded-lg text-xl"
                  name="HamburgerMenu"
                />
              </button>
            ) : null}
          </div>
          <div
            className="hidden w-full xl:block lg:block md:hidden md:w-auto xl:order-2 lg:order-2"
            id="navbar-dropdown"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              {mainmenu.map((menu, index) => (
                <li key={index}>
                  {menu?.url ? (
                    <Link
                      href={menu?.url || ""}
                      className={`block py-2 px-3  rounded   md:p-0 hover:text-blue-700 text-lg ${
                        pathName == menu?.url
                          ? "text-secondary"
                          : "text-dark_text"
                      }`}
                      aria-current="page"
                    >
                      {menu.title}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="flex gap-2 items-center text-dark_text text-lg"
                      onClick={handlemegamenu}
                    >
                      {menu.title} <SVGIcon name="ArrowDown" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      {isDropdownOpen ? (
        <div
          className={`w-full bg-white fixed w-full left-0 z-[99] top-[70px] ${
            isDropdownOpen
              ? "shadow-[rgba(149,157,165,0.2)_0px_8px_24px] border border-solid border-[#f0f0f0] "
              : "hidden"
          }`}
          id="navbar-dropdown"
        >
          <div className="sm:grid grid-cols-8 gap-5">
            <div className="grid-item col-span-5 pt-10 pb-[52px] xl:pl-[60px] lg:pl-[60px] md:pl-[20px] pl-[20px] xl:pr-0 lg:pr-0 md:pr-0 pr-[20px]">
              <h2 className="text-[#757575] tracking-widest uppercase text-sm font-medium leading-[1.3] mb-7 pb-2 border-b-[#f0f0f0] border-b border-solid">
                {content.title_1}
              </h2>
              <div className="sm:grid grid-cols-2 gap-8">
                {mainmenu.map((menu, index) => (
                  <React.Fragment key={index}>
                    {menu.max_menu?.map((item, index) => (
                      <Link
                        href={item.url}
                        key={index}
                        className="flex gap-3 group"
                      >
                        <SVGIcon
                          className="text-[20px] w-[30px] h-[30px] leading-[30px]  flex justify-center items-center rounded-[50%] group-hover:text-blue-700"
                          name={item.icon}
                        />
                        <div className="technology">
                          <h3 className="tracking-[0.03em] font-semibold text-[#080808] text-base group-hover:text-blue-700 group-hover:underline">
                            {item.title}
                          </h3>
                          <p className="text-[#5a5a5a] text-sm font-normal leading-[1.5em] no-underline mt-2">
                            {item.label}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="grid-item col-span-3 pt-11 bg-[#f0f0f0] border-l-[#d8d8d8] border-l border-solid">
              <div className="xl:px-[60px] lg:px-[60px] md:px-[20px] px-[20px]">
                <h2 className="text-[#757575] tracking-widest uppercase text-sm font-medium leading-[1.3] mb-3 pb-2 border-b-[#d8d8d8] border-b border-solid">
                  {content.title_2}
                </h2>
                <div className="divide-y-2 ">
                  {mainmenu.map((stories, index) => (
                    <React.Fragment key={index}>
                      {stories.stories?.map((items, index) => (
                        <Link
                          href={items.url}
                          key={index}
                          className=" items-center justify-between text-base leading-[1.6] transition-[color] duration-[0.2s] flex py-4"
                        >
                          <h3 className="tracking-[0.03em] font-semibold hover:text-blue-700">
                            {items.title}
                          </h3>
                          <SVGIcon name={items.icon} />
                        </Link>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div
        className={`${
          isOpen ? "bg-[rgba(0,0,0,0.8)] fixed inset-0  z-[999] " : ""
        }`}
      >
        <div
          className={`lg:w-auto lg:order-1 z-50 ${
            isOpen
              ? "animate-[slideIn_0.5s_forwards] fixed w-full h-full bg-white transition-[left] duration-[0.3s] ease-[ease] z-[1] left-0 top-0 xl:bg-transparent xl:relative xl:animate-[unset] xl:inset-x-[unset] lg:bg-white lg:relative lg:animate-[slideIn_0.5s_forwards] lg:inset-x-[unset]"
              : "animate-[slideOut_0.5s_forwards] fixed w-full h-full bg-white transition-[left] duration-[0.3s] ease-[ease] left-0 top-0 xl:bg-transparent xl:relative xl:animate-[slideOut_0.5s_forwards] xl:inset-x-[unset] lg:bg-white lg:relative lg:animate-[unset] lg:inset-x-[unset]"
          }`}
        >
          {isOpen ? (
            <div className="w-full ">
              <div className="bg-primary py-4 px-2 flex justify-between items-center px-7 py-3">
                <Link
                  href="/"
                  className="text-dark_text block text-3xl font-bold relative no-underline z-[1] after:bg-tertiary after:rounded after:content-[''] after:block after:h-[45px] after:left-[-10%] after:absolute after:rotate-45 after:w-[45px] after:z-[-1] after:top-0 leading-[46px]"
                >
                  {" "}
                  Skilline
                </Link>
                <div>
                  <span onClick={handleClose}>
                    <SVGIcon
                      className="shadow-[1px_13px_10px_-2px_rgba(34,60,80,0.13)] bg-white inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-secondary rounded-lg  text-xl"
                      name="RxCross2"
                    />
                  </span>
                </div>
              </div>
              <div className="text-black flex flex-wrap px-2  mt-3">
                <ul className="w-full divide-y-2 divide-primary">
                  {mainmenu.map((menu, index) => (
                    <li key={index}>
                      {menu?.url ? (
                        <Link
                          href={menu?.url || ""}
                          className={`block py-2 px-3  rounded  hover:text-blue-700 ${
                            pathName == menu?.url
                              ? "text-secondary"
                              : "text-[#113c49]"
                          }`}
                          aria-current="page"
                        >
                          {menu.title}
                        </Link>
                      ) : (
                        <span
                          className="flex gap-2 items-center py-2 px-3 text-[#113c49]"
                          onClick={handlemegamenu}
                        >
                          {menu.title} <SVGIcon name="ArrowDown" />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              {isDropdownOpen ? (
                <div
                  className="w-full h-[300px] lg:h-[unset] md:h-[unset] overflow-scroll bg-white w-full mt-3"
                  id="navbar-dropdown"
                >
                  <div className="sm:grid grid-cols-8 gap-5">
                    <div className="grid-item col-span-5 pt-5 pb-[52px] xl:pl-[60px] lg:pl-[60px] md:pl-[20px] pl-[20px] xl:pr-0 lg:pr-0 md:pr-0 pr-[20px]">
                      <h2 className="text-[#757575] tracking-widest uppercase text-sm font-medium leading-[1.3] mb-7 pb-2 border-b-[#f0f0f0] border-b border-solid">
                        {content.title_1}
                      </h2>
                      <div className="sm:grid grid-cols-2 lg:gap-5 md:gap-5 space-y-5 lg:space-y-0 md:space-y-0">
                        {mainmenu.map((menu, index) => (
                          <React.Fragment key={index}>
                            {menu.max_menu?.map((item, index) => (
                              <Link
                                href={item.url}
                                key={index}
                                className="flex gap-3 group"
                              >
                                <SVGIcon
                                  className="text-[20px] group-hover:text-blue-700"
                                  name={item.icon}
                                />
                                <div className="technology">
                                  <h3 className="tracking-[0.03em] font-semibold text-[#080808] text-base group-hover:text-blue-700 group-hover:underline">
                                    {item.title}
                                  </h3>
                                  <p className="text-[#5a5a5a] text-sm font-normal leading-[1.5em] no-underline mt-2">
                                    {item.label}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    <div className="grid-item col-span-3 pt-11 bg-[#f0f0f0] border-l-[#d8d8d8] border-l border-solid">
                      <div className="xl:px-[60px] lg:px-[60px] md:px-[20px] px-[20px]">
                        <h2 className="text-[#757575] tracking-widest uppercase text-sm font-medium leading-[1.3] mb-3 pb-2 border-b-[#d8d8d8] border-b border-solid">
                          {content.title_2}
                        </h2>
                        <div className="divide-y-2 ">
                          {mainmenu.map((stories, index) => (
                            <React.Fragment key={index}>
                              {stories.stories?.map((items, index) => (
                                <Link
                                  href={items.url}
                                  key={index}
                                  className=" items-center justify-between text-base leading-[1.6] transition-[color] duration-[0.2s] flex py-4"
                                >
                                  <h3 className="tracking-[0.03em] font-semibold hover:text-blue-700">
                                    {items.title}
                                  </h3>
                                  <SVGIcon name={items.icon} />
                                </Link>
                              ))}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="gap-10 flex fixed w-full px-3 py-2.5 border-t-secondary bg-primary border-t border-solid bottom-0">
                <button
                  type="button"
                  className="bg-secondary  text-white text-[15px] rounded-[80px] px-[30px] py-2 w-full"
                  onClick={handleLogin}
                >
                  {content.login}
                </button>
                <button
                  type="button"
                  className="bg-secondary  text-white text-[15px] rounded-[80px] px-[30px] py-2 w-full"
                  onClick={handleSignup}
                >
                  {content.signup}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {login && (
        <div
          className={`${
            login ? "fixed inset-0 overflow-y-auto z-[999] bg-[#00000096]" : ""
          }`}
        >
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative bg-white xl:w-[40%] lg:w-[50%] md:w-[60%] w-[90%] mx-auto shadow-lg rounded-[20px] px-[20px]">
              <div className="flex items-center justify-between py-[20px] border-b-[#DADADA] border-b border-solid">
                <span className="text-[22px] font-semibold text-secondary">
                  Login
                </span>
                <button type="button" onClick={handleLoginClose}>
                  <SVGIcon className="text-xl" name="RxCross2" />
                </button>
              </div>
              <LoginPopup
                email={login_form.email}
                password={login_form.password}
                button={login_form.button}
                password_protection={login_form.password_protection}
                checkbox={login_form.checkbox}
              />
            </div>
          </div>
        </div>
      )}

      {signup && (
        <div
          className={`${
            signup ? "fixed inset-0 overflow-y-auto z-[999] bg-[#00000096]" : ""
          }`}
        >
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative bg-white xl:w-[40%] lg:w-[50%] md:w-[60%] w-[90%] mx-auto shadow-lg rounded-[20px] px-[20px]">
              <div className="flex items-center justify-between py-[20px] border-b-[#DADADA] border-b border-solid">
                <span className="text-[22px] font-semibold text-secondary">
                  Sign Up
                </span>
                <button type="button" onClick={handlesignupClose}>
                  <SVGIcon className="text-xl" name="RxCross2" />
                </button>
              </div>
              <SignUpPopup
                username={signup_form.username}
                email={signup_form.email}
                password={signup_form.password}
                button={signup_form.button}
                password_protection={signup_form.password_protection}
                handleClose={handlesignupClose}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
