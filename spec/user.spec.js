const User = require("../src/user");

describe("test user", () => {
  let user;
  beforeEach(() => {
    user = new User("shehab", "12345", "ALexandria");
  });
  describe("user creation", () => {
    it("user name should be shehab", () => {
      expect(user.name).toEqual("shehab");
    });
    it("user password should be '12345'", () => {
      expect(user.password).toEqual("12345");
    });
    it("user address should be 'ALexandria'", () => {
      expect(user.address).toEqual("ALexandria");
    });
  });

  // test cases for add to cart
  describe("add to cart", () => {
    it("add a product to cart", () => {
      let product = {
        name: "hp laptop",
        price: 2000,
      };
      user.addToCart(product);
      expect(user.cart[0]).toEqual(product);
    });
    it("add products to cart", () => {
      let product1 = {
        name: "hp laptop",
        price: 2000,
      };
      let product2 = {
        name: "iphone 15",
        price: 1000,
      };
      user.addToCart(product1);
      user.addToCart(product2);
      expect(user.cart).toEqual([product1, product2]);
      expect(user.cart).toHaveSize(2);
    });
    it("test case for empty cart", () => {
      expect(user.cart).toEqual([]);
    });
  });
  describe("calculate total cart price", () => {
    it("calculate total cart price", () => {
      let product1 = {
        name: "laptop",
        price: 2000,
      };
      let product2 = {
        name: "phone",
        price: 1000,
      };
      user.addToCart(product1);
      user.addToCart(product2);
      expect(user.calculateTotalCartPrice()).toEqual(3000);
    });
    it("calculate total price of empty cart", () => {
      expect(user.calculateTotalCartPrice()).toEqual(0);
    });
  });
  describe("checkout", () => {
    it("checkout", () => {
      let product1 = {
        name: "laptop",
        price: 2000,
      };
      let product2 = {
        name: "phone",
        price: 1000,
      };
      user.addToCart(product1);
      user.addToCart(product2);
      let paymentService = jasmine.createSpyObj(["setPaymentInfo", "returnBack", "isVerified"]);
      let deliveryService = jasmine.createSpyObj(["shipping"]);
      user.checkout(paymentService, deliveryService);
      expect(paymentService.setPaymentInfo).toHaveBeenCalled();
      expect(paymentService.returnBack).toHaveBeenCalled();
      expect(paymentService.isVerified).toHaveBeenCalled();
    });
  });

  // when is verified
  it("when is verified", () => {
    let product1 = {
      name: "laptop",
      price: 2000,
    };
    let product2 = {
      name: "phone",
      price: 1000,
    };
    user.addToCart(product1);
    user.addToCart(product2);
    let paymentService = jasmine.createSpyObj(["setPaymentInfo", "returnBack", "isVerified"]);
    paymentService.isVerified.and.returnValue(true);
    let deliveryService = jasmine.createSpyObj(["shipping"]);
    user.checkout(paymentService, deliveryService);
    expect(deliveryService.shipping).toHaveBeenCalled();
    expect(deliveryService.shipping).toHaveBeenCalledWith(user.address, user.cart);
  });

  // when is not verified
  it("when is not verified", () => {
    let product1 = {
      name: "laptop",
      price: 2000,
    };
    let product2 = {
      name: "phone",
      price: 1000,
    };
    user.addToCart(product1);
    user.addToCart(product2);
    let paymentService = jasmine.createSpyObj(["setPaymentInfo", "returnBack", "isVerified"]);
    paymentService.isVerified.and.returnValue(false);
    let deliveryService = jasmine.createSpyObj(["shipping"]);
    user.checkout(paymentService, deliveryService);
    expect(deliveryService.shipping).not.toHaveBeenCalled();
  });
});
