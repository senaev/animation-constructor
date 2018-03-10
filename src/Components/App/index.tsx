import { MuiThemeProvider } from 'material-ui/styles';
import * as React from 'react';
import { Board } from '../Board';

export class App extends React.Component<{}, {}> {
    public render() {
        return <MuiThemeProvider>
            <Board/>
        </MuiThemeProvider>;
    }
}
