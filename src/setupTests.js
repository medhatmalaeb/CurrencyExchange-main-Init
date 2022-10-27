// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from "@testing-library/react";
import Home from './components/Home/Home';


//test block
test("Home", () => {
// render the component on virtual dom
render(<Home />);

//select the elements you want to interact with
const amountValue = screen.getByTestId("amount").value;
const toValue = screen.getByTestId("to").value;
const fromValue = screen.getByTestId("from").value;
const submitBtn = screen.getByTestId("submit");
const rateHome=screen.getByTestId("rateHome")
if(amountValue!==""||amountValue!==0)


{//interact with those elements
fireEvent.click(submitBtn);}

//assert the expected result
expect(rateHome).toHaveTextContent(fromValue);
});
