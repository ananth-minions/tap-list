import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { View } from 'react-native';

import { propTypes } from './propTypes';

import { resetTaplist, updateSwipeIndex, resetSwipeIndex } from '../../../redux/actions';

import Deck from '../Deck';
import DeckCard from '../DeckCard';
import EndDeckCard from '../EndDeckCard';

class SwipeContainer extends Component {
  renderCard = item => <DeckCard item={item} />;

  renderNoMoreCards = () => (
    <EndDeckCard
      title="Tapped Keg..."
      text="No more beers to taste!"
      noBtnText="More Pints"
      yesBtnText="View Tap List"
      onNoPress={() => this.resetSwipeList()}
      onYesPress={() => this.viewTapList()}
    />
  );

  viewTapList = (taplist) => {
    Actions.taplist({ taplist });
  };

  // CHANGE TO PAGINATION
  resetSwipeList = () => {
    this.props.resetTaplist();
    this.props.resetSwipeIndex();
    Actions.reset('swipe');
  };

  render() {
    const {
      data, onSwipeRight, onSwipeLeft, currentSwipeIndex,
    } = this.props;

    return (
      <View style={{ flex: 4 }}>
        <Deck
          data={data}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={onSwipeRight}
          onSwipeLeft={onSwipeLeft}
          currentIndex={currentSwipeIndex}
          updateCurrentIndex={this.props.updateSwipeIndex}
          resetCurrentIndex={this.props.resetSwipeIndex}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ deck }) => {
  const { currentSwipeIndex } = deck;
  return { currentSwipeIndex };
};

SwipeContainer.propTypes = propTypes;

export default connect(
  mapStateToProps,
  { resetTaplist, updateSwipeIndex, resetSwipeIndex },
)(SwipeContainer);