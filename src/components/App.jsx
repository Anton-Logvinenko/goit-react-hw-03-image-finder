
import { Toaster } from 'react-hot-toast';
import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    imgSearch: '',
  };

  handelSubmit = imgSearch => {
    this.setState({ imgSearch });
  };

  render() {
    return (
      <div>
        <Toaster />
        <Searchbar onSearch={this.handelSubmit} />
        <ImageGallery imgSearch={this.state.imgSearch} />
      </div>
    );
  }
}


