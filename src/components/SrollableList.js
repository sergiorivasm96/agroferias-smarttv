import React from 'react'
import $ from 'jquery'; 
import './styles/ScrollableList.css'

class ScrollableList extends React.Component{
    constructor(props) {
        super(props);
        this.scrollDuration = 300;
        this.paddleMargin = 20;
        this.onScrollMenu = this.onScrollMenu.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() { 
        this.itemSize = $('.item').outerWidth(true);
        this.itemsLength =  document.getElementsByClassName('item').length;
        this.menuSize = this.getMenuSize();
        this.menuWrapperSize = $('.menu-wrapper').outerWidth();
        this.menuVisibleSize = this.menuWrapperSize;
        this.menuVisibleSizemenuSize = this.getMenuSize();
        this.menuInvisibleSize = this.menuSize - this.menuWrapperSize;
        $(window).on('resize', function() {
            this.menuWrapperSize = $('.menu-wrapper').outerWidth();
        });
    }

    getMenuSize() {
        console.log('itemsLength: ' + this.itemsLength)
        console.log('itemSize: ' + this.itemSize)
        return this.itemsLength * this.itemSize;
    };
   
    // get how much have we scrolled to the left
    getMenuPosition() {
        return $('.menu').scrollLeft();
    };

    // finally, what happens when we are actually scrolling the menu
    onScrollMenu(){
        // get how much of menu is invisible
        this.menuInvisibleSize = this.menuSize - this.menuWrapperSize;
    }

    onClickRightPaddle(){
        $('.menu').animate( { scrollLeft: this.menuInvisibleSize}, this.scrollDuration);
    }

    onClickLeftPaddle(){
        $('.menu').animate( { scrollLeft: '0' }, this.scrollDuration);
    }

    onClick(){
        console.log('in');
        console.log(document.activeElement.className);
    }

    render (){
        return(
            <div>
                <div className="menu-wrapper">
                    <ul className="menu .keyboard-row" onScroll={this.onScrollMenu} >
                        <li className="item item-focusable"onClick={this.onClick} >Feria1</li>
                        <li className="item item-focusable">Feria2</li>
                        <li className="item item-focusable">Feria3</li>
                        <li className="item item-focusable">Feria4</li>
                        <li className="item item-focusable">Feria5</li>
                        <li className="item item-focusable">Feria6</li>
                        <li className="item item-focusable">Feria7</li>
                        <li className="item item-focusable">Feria8</li>
                        <li className="item item-focusable">Feria9</li>
                        <li className="item item-focusable">Feria10</li>
                    </ul>
                </div>
            </div>
        )
    }
}
  
export default ScrollableList;