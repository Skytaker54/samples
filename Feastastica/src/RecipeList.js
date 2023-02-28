import React, { Component } from 'react'

export default class RecipeList extends Component {
    state = {};
    async componentDidMount() {
        try {
            const index = await this.fetchRecipe('recipes');
            this.setState({
                recipes: index
            });
        }
        catch (e) {
            this.setState({
                recipes: null,
                error: e.error
            });
        }
    }
    async fetchRecipe(file) {
        try {
            return await (await fetch(`./json/${file}.json`)).json();
        } catch (e) {
            throw new Error(e);
        }
    }
    async setRecipe(e) {
        let url = e.target.value;
        url = url.replace('json/', '');
        url = url.replace('.json', '');
        try {
            this.props.showRecipe( url !== '' && await this.fetchRecipe(url));
        } catch (e) {
            console.error(e);
        }
        
    }
    render() {
        const { recipes, error } = this.state;
        const content =
            recipes ?
                recipes.length > 0 ?
                    <form>
                        <label className="pe-1">Select a recipe:</label>
                        <select onChange={e => this.setRecipe(e)}>
                            <option value=""></option>
                            {recipes.map(item => <option key={item.name} value={item.url}>{item.name}</option>)}
                        </select>
                    </form>
                    : <option className='text-danger'>ERROR: No recipes in file</option>
                : error ?
                    <option className='text-danger'>{error}</option>
                    : <option className='text-danger'>ERROR: No file found</option>;
        return (
            <>
                {content}
            </>
        )
    }
}
